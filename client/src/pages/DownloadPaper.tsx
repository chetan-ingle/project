import React, { useState, useEffect, useContext } from "react";
import Layout from "../Partials/Layout";
import { getApprovedPaper } from "../service/paper.service";
import { userContext } from "../../Context/UserContext";
import { BASE_URL } from "../utils/static";
import FileViewer from "react-file-viewer";
const DownloadPaper = () => {
  const current_time = new Date().getTime()
  const [loading, setLoading] = useState(false);
  const { moderator: examiner } = useContext(userContext)
  const [papers, setPapers] = useState([]);

  const [preview, setPreview] = useState<string | null>(null);

  async function fetch_papers(email: string) {
    setLoading(true);
    const data = await getApprovedPaper(email);
    console.log(data)
    setLoading(false);
    setPapers(data.data);
  }

  function check_if_availabel(time: string, window: number) {
    return new Date(time).getTime() - Number(window) * 60 * 1000 <= current_time
  }

  async function download_from_url(url: string, filename: string) {
    const anchor = document.createElement('a');
    anchor.download = filename;
    fetch(url).then(a => a.blob()).then((b: Blob) => {
      anchor.href = URL.createObjectURL(b)
      anchor.click()
      anchor.remove()
    })
  }
  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    fetch_papers(user.email);
  }, []);
  return (
    <Layout>
      <main className="h-[calc(100vh-160px)] space-y-4">
        <h2 className="p-8 pb-0 text-xl font-semibold">
          Papers scheduled for your College/Institute.
        </h2>
        <small

          className="px-8 text-sm font-semibold text-red-500"
        >
          All times are in GMT+5.30
        </small>
        <main className="flex flex-col h-full md:flex-row w-full">
          <section className="w-full md:w-1/3 h-full overflow-y-auto space-y-4 border-r">
            {loading && (
              <div className="py-3 bg-slate-600/10 w-11/12 mx-auto rounded-sm text-slate-600 font-  px-6">
                <h4>Loading...</h4>
              </div>
            )}
            {!loading && papers && papers?.length < 1 && (
              <div className="py-3 bg-red-600/10 w-11/12 mx-auto rounded-sm text-red-600 font-medium px-6">
                <h4>No papers found.</h4>
              </div>
            )}

            {!loading &&
              papers?.map((data: {
                _id: string,
                subject: {
                  name: string,
                  code: string
                },
                status: {
                  accepted: boolean,
                  time: string,
                  allow_before: number
                }
              }) => (
                <details
                  key={data?._id}
                  className="bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all"
                >
                  <summary className="bg-slate-200 cursor-pointer py-2 px-6 flex justify-between rounded-md">
                    <span className="underline ">{data?.subject?.name}</span>
                    <span>
                      {new Date(data?.status?.time).toLocaleString("en-us", {
                        dateStyle: "medium",
                        timeStyle: 'medium'
                      })}
                    </span>
                  </summary>
                  <div
                    style={{
                      display: check_if_availabel(data.status.time, data.status.allow_before) ? "block" : "none",
                    }}
                    className="flex pt-4 space-x-4 items-center"
                  >
                    <button
                      className="py-1 px-4 bg-sky-500 text-white rounded-md"
                      onClick={() => setPreview(`${BASE_URL}/paper/examiner/view?eid=${examiner?.email}&&pid=${data?.subject?.code}`)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => download_from_url(`${BASE_URL}/paper/examiner/view?eid=${examiner?.email}&&pid=${data?.subject?.code}`, `${data?.subject?.code}_${data?.subject?.name}.pdf`)}
                      className="py-1 px-4 bg-green-600 text-white rounded-md"
                    >
                      Downlaod
                    </button>
                  </div>
                  <main
                    className="p-4 bg-green-600/10 text-green-700 rounded-md mt-4"
                    style={{
                      display: check_if_availabel(data.status.time, data.status.allow_before) ? "none" : "block",
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
          <section className="w-full h-full flex justify-center overflow-y-auto md:w-2/3 border-l">
            {
              preview
                ?
                <div
                  className='w-full'
                >
                  <FileViewer
                    fileType={'pdf'}
                    filePath={preview}
                    key={preview}
                  />
                  <button
                    onClick={() => setPreview(null)}
                    className="bg-red-600 text-2xl text-white h-10 w-10 absolute top-24 right-4"
                  >
                    &times;
                  </button>
                </div>
                : <main
                  className="w-11/12 mx-auto h-max bg-slate-200 text-slate-800 p-4 rounded-md"
                >
                  Please Select paper to view
                </main>
            }
          </section>
          {/* <audio src="http://localhost:6789/static/SarangaDariya-Telugu-wapinmp3.mpeg" controls>audio</audio>  */}
        </main>
      </main>

    </Layout>
  );
};

export default DownloadPaper;
