import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../Partials/Layout";
import { userContext } from "../../Context/UserContext";

import { accept_paper, get_paper } from "../service/paper.service";
import extractFormData from "../utils/extractFormData";
import { ApplicationType } from "./Application_setter";
import useViewPaperModerator from "../hooks/useViewPaperModerator";
import { toast } from "react-hot-toast";

const QuestionPapers = () => {
  const { moderator: user } = useContext(userContext);

  const [viewPaper, setViewPaper] = useState<boolean>(false);
  const [subject, setSubject] = useState<ApplicationType["subject"]>(
    user?.subject[0]
  );

  const { Viewer } = useViewPaperModerator(user?.email, subject?.code);

  const [loading, setLoading] = useState<boolean>(false);
  const [scheduling, setScheduling] = useState<boolean>(false);
  const [paper, setPapers] = useState<null | any[]>(null);
  const [accepted, setAccepted] = useState<{
    code: string;
    name: string;
  } | null>(null);
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
      subject,
      status: {
        time: formdata.date,
        allow_before: formdata.before,
      },
    };
    setScheduling(true);
    const { data, error, message } = await accept_paper(payload);
    //  upadte the paper status
    fetch_papers();
    setScheduling(false);
    if (error) {
      return toast(message, { position: "top-right", icon: "❌" });
    }
    toast(message, { position: "top-right", icon: "✅" });
    setAccepted(null)
  }

  useEffect(() => {
    setSubject(user?.subject[0]);
  }, [user]);
  return (
    <Layout>
      <main className="h-[calc(100vh-140px)]">
        <main className="pt-6 bg-slate-200 pb-6 px-8 flex items-center justify-between">
          <p className="text-lg">
            Showing question papers for
            <span className="text-purple-600 font-bold ml-2">
              {subject?.name}
            </span>
          </p>
          <div className="">
            {user?.subject.map(
              (sub: ApplicationType["subject"], index: number) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      setSubject(sub);
                      setAccepted(null);
                    }}
                    className={`cursor-pointer  border border-current bg-white-600 px-4 py-2 rounded-md ml-2 ${
                      subject === sub
                        ? "bg-purple-700 text-white"
                        : "text-purple-600"
                    }`}
                  >
                    {sub?.name}
                  </span>
                );
              }
            )}
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
                      Subject: <b>{accepted?.name}</b>
                    </p>
                    <p>
                      Subject code : <b>{accepted?.code}</b>
                    </p>
                  </section>

                  <hr />
                  <p className="mt-3 font-semibold">Schedule paper</p>
                  <section className="flex bg-slate-100 pb-4 mt-2 rounded-md items-center">
                    <div className="w-1/2 p-2">
                      <label htmlFor="year">Date</label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="datetime-local"
                        name="date"
                        required
                      />
                    </div>
                    <div className="w-1/2 p-2">
                      <label htmlFor="before">Release before (minutes)</label>
                      <input
                        className="w-full border py-2 px-4 rounded-lg"
                        type="number"
                        max={60}
                        min={0}
                        name="before"
                        required
                        defaultValue={0}
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
                    <button
                      disabled={scheduling}
                      className="border border-green-600 text-white bg-green-600 px-4 py-2 rounded-lg"
                    >
                      {scheduling ? "Scheduling..." : "Schedule"}
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
                  <div
                    style={{
                      display: data?.status.accepted ? "none" : "inline-block",
                    }}
                    className="flex pt-4 space-x-4 items-center"
                  >
                    <button
                      className="py-1 px-4 bg-sky-500 text-white rounded-md"
                      onClick={() => setViewPaper(true)}
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        setAccepted({
                          name: data?.subject?.name,
                          code: data?.subject?.code,
                        })
                      }
                      className="py-1 px-4 bg-green-600 text-white rounded-md"
                    >
                      Accept
                    </button>
                  </div>
                  <main
                    className="p-4 bg-green-600/10 text-green-700 rounded-md mt-4"
                    style={{
                      display: data?.status.accepted ? "block" : "none",
                    }}
                  >
                    This paper is scheduled for{" "}
                    {
                      <b>
                        {new Date(data?.status.time).toLocaleString("en-us", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </b>
                    }
                  </main>
                </details>
              ))}
          </section>
          <section className="w-full bg-white h-full flex justify-center overflow-y-auto md:w-2/3 border-l">
            {!viewPaper && (
              <>
                <div className="w-full text-center mt-12 h-max text-2xl font-bold text-slate-300">
                  Click on view button to see question paper
                </div>
              </>
            )}
            {viewPaper && (
              <>
                <button
                  onClick={() => setViewPaper(false)}
                  className="text-red-600 text-lg cursor-pointer z-20 absolute top-36  right-10"
                >
                  close
                </button>
                <div className="w-full ">
                  <Viewer />
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
