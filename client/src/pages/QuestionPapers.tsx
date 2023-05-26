import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../Partials/Layout";
import FileViewer from "react-file-viewer";
import { FileUploader } from "react-drag-drop-files";
import { delete_material, put_material } from "../service/material.service";
import { userContext } from "../../Context/UserContext";
import { toast } from "react-hot-toast";
import useMaterial from "../hooks/useMaterial";
import { AiFillDelete } from "react-icons/ai";
import { get_paper } from "../service/paper.service";
import extractFormData from "../utils/extractFormData";
import { ApplicationType } from "./Application_setter";

const QuestionPapers = () => {
  const { moderator: user } = useContext(userContext);
  const [doc_link, setDocLink] = useState<null | string>(null);
  const [subject, setSubject] = useState<ApplicationType['subject']>(user?.subject[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paper, setPapers] = useState<null | any[]>(null);
  const [accepted, setAccepted] = useState(null);
  async function fetch_papers() {
    setLoading(true);
    const data = await get_paper(subject.code);
    setLoading(false);
    setPapers(data.data);
  }
  useEffect(() => {
    subject?.code && fetch_papers();
  }, [subject?.name]);

  async function handle_paper_schedule_action(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = extractFormData(e.target);
    const payload = {
      ...formdata,
      paper_id: accepted,
      selected_by: user?._id,
      subject,
    };
    alert(JSON.stringify(payload));
  }
  useEffect(() => {
    setSubject(user?.subject[0])
    console.log(user?.subject[0])
  }, [user])
  return (
    <Layout>
      <main className="h-[calc(100vh-140px)]">
        <main className="pt-6 bg-slate-200 pb-6 px-8 flex items-center justify-between">
          <p className="text-lg">
            Showing question papers for
            <span className="text-purple-600 font-bold ml-2">{subject?.name}</span>
          </p>
          <div className="">
            {user?.subject.map((sub: ApplicationType['subject'], index: number) => {
              return (
                <span
                  key={index}
                  onClick={() => setSubject(sub)}
                  className={`cursor-pointer  border border-current bg-white-600 px-4 py-2 rounded-md ml-2 ${subject === sub
                    ? "bg-purple-700 text-white"
                    : "text-purple-600"
                    }`}
                >
                  {sub?.name}
                </span>
              );
            })}
          </div>
        </main>
        <main className="flex flex-col h-full md:flex-row w-full">
          <section className="w-full relative py-8 md:w-1/3 h-full overflow-y-auto space-y-4 border-r">
            {/* schedule paper form */}
            <section
              style={{
                opacity: accepted ? "1" : "0",
                visibility: accepted ? "visible" : "collapse",
              }}
              className="absolute transition-all duration-500 grid place-items-center backdrop-blur-sm backdrop-filter inset-0 bg-black/40"
            >
              <main className="bg-white p-4 rounded-md w-11/12 shadow-lg">
                <h3 className="font-semibold">Confirmation form.</h3>
                <form onSubmit={handle_paper_schedule_action} className="py-4">
                  <hr />
                  <section className="py-4 mb-3">
                    <p>
                      Subject: <b>{subject?.name}</b>
                    </p>
                    <p>
                      Subject code : <b>{subject?.code}</b>
                    </p>
                  </section>

                  <hr />
                  <section className="flex mb-3 py-3 items-center">
                    <div className="w-1/2 p-2">
                      <label htmlFor="year">Standard/year</label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="number"
                        name="year"
                      />
                    </div>

                    <div className="w-1/2 p-2">
                      <label htmlFor="year">Semester (if applicable)</label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="number"
                        name="year"
                      />
                    </div>
                  </section>

                  <hr />
                  <p className="mt-3 font-semibold">Schedule paper</p>
                  <section className="flex bg-slate-100 pb-4 mt-2 rounded-md items-center">
                    <div className="w-1/2 p-2">
                      <label htmlFor="year">Date</label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="date"
                        name="date"
                      />
                    </div>

                    <div className="w-1/2 p-2">
                      <label htmlFor="year">Time </label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="time"
                        name="time"
                      />
                    </div>
                  </section>
                  <main className="flex justify-end mt-6 py-2 px-1 space-x-4">
                    <button
                      onClick={() => setAccepted(null)}
                      type="button"
                      className="border border-current text-red-500 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button className="border border-green-600 text-white bg-green-500 px-4 py-2 rounded-lg">
                      Schedule
                    </button>
                  </main>
                </form>
              </main>
            </section>
            {loading && (
              <div className="py-3 bg-slate-600/10 w-11/12 mx-auto rounded-sm text-slate-600 font-  px-6">
                <h4>Loading...</h4>
              </div>
            )}
            {!loading && paper && paper?.length < 1 && (
              <div className="py-3 bg-red-600/10 w-11/12 mx-auto rounded-sm text-red-600 font-medium px-6">
                <h4>No papers found.</h4>
              </div>
            )}

            {!loading &&
              paper?.map((data) => (
                <details
                  key={data?._id}
                  className="bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all"
                >
                  <summary className="bg-slate-200 cursor-pointer py-2 px-6 flex justify-between rounded-md">
                    <span className="underline ">{data?.setter?.name}</span>
                    <span>
                      {new Date(data?.date).toLocaleString("en-us", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </summary>
                  <div className="flex pt-4 space-x-4 items-center">
                    <button
                      className="py-1 px-4 bg-sky-500 text-white rounded-md"
                      onClick={() => setDocLink(data.file_url)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => setAccepted(data?._id)}
                      className="py-1 px-4 bg-green-600 text-white rounded-md"
                    >
                      Accept
                    </button>
                  </div>
                </details>
              ))}
          </section>
          <section className="w-full bg-white h-full flex justify-center overflow-y-auto md:w-2/3 border-l">
            {!doc_link && (
              <>
                <div className="w-full text-center mt-12 h-max text-2xl font-bold text-slate-300">
                  Click on view button to see question paper
                </div>
              </>
            )}
            {doc_link && (
              <>
                <button
                  onClick={() => setDocLink(null)}
                  className="text-red-600 text-lg cursor-pointer z-20 absolute top-36  right-10"
                >
                  close
                </button>
                <div className="w-full ">
                  <FileViewer
                    key={doc_link}
                    fileType={"pdf"}
                    filePath={doc_link}
                  />
                </div>
              </>
            )}
          </section>
          {/* <audio src="http://localhost:6789/static/SarangaDariya-Telugu-wapinmp3.mpeg" controls>audio</audio>  */}
        </main>
      </main>
    </Layout>
  );
};

export default QuestionPapers;
