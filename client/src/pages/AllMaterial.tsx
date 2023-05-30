import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Layout from "../Partials/Layout";
import FileViewer from "react-file-viewer";

import { userContext } from "../../Context/UserContext";
import { toast } from "react-hot-toast";
import useMaterial, { useAllMaterial } from "../hooks/useMaterial";


const AllMaterial = () => {
  const { moderator: setter } = useContext(userContext);
  const [doc_link, setDocLink] = useState<null | string>(null);
  const {
    data,
    loading: fetching,
    refetch,
  } = useAllMaterial();

  const material_data = [
    {
      title: "Syllabus",
      data: data && data?.filter((i: any) => i.type === "syllabus"),
    },
    {
      title: "Paper format",
      data: data && data?.filter((i: any) => i.type === "format"),
    },
    {
      title: "Material",
      data: data && data?.filter((i: any) => i.type === "material"),
    },
  ];


  return (
    <Layout>
      <main className="h-[calc(100vh-160px)]">
        <h2 className="p-8 text-xl font-semibold">
         All material
        </h2>
        <main className="flex flex-col h-full md:flex-row w-full">
          <section className="w-full md:w-1/3 h-full overflow-y-auto space-y-4 border-r">
            {material_data.map(({ data, title }) => (
              <details
                key={title}
                className="bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all"
              >
                <summary className="bg-slate-200 p-2  rounded-md">
                  {title}
                </summary>
                <div className="flex pt-4 flex-col space-y-3">
                  {data?.map(
                    (item: { desc: string; url: string; _id: string ,subject:string}) => (
                      <div
                        key={item._id}
                        className="flex py-2 justify-between px-4 items-center bg-slate-100"
                      >
                        <button
                          className="underline text-left"
                          onClick={() =>
                            setDocLink(
                              "http://localhost:6789/static/" + item?.url
                            )
                          }
                        >
                          {item.desc}
                          <br />

                        </button>
                        <small>{item.subject}</small>
                      </div>
                    )
                  )}
                  {!data?.length ? <h4>No data found.</h4> : null}
                </div>
              </details>
            ))}
          </section>
          <section className="w-full h-full flex justify-center overflow-y-auto md:w-2/3 border-l">
            {!doc_link && (
              <>
                <div className="w-full text-center mt-12 h-max text-2xl font-bold text-slate-300">
                  Click on document link to preview
                </div>
              </>
            )}
            {doc_link && (
              <>
                <button
                  onClick={() => setDocLink(null)}
                  className="bg-red-600 text-white absolute top-20 w-10 h-10 rounded-full text-3xl right-10"
                >
                  &times;
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

export default AllMaterial;
