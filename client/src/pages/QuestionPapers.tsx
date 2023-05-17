import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Layout from '../Partials/Layout'
import FileViewer from 'react-file-viewer';
import { FileUploader } from "react-drag-drop-files";
import { delete_material, put_material } from '../service/material.service';
import { userContext } from '../../Context/UserContext';
import { toast } from 'react-hot-toast';
import useMaterial from '../hooks/useMaterial';
import { AiFillDelete } from 'react-icons/ai'
import { get_paper } from '../service/paper.service';

const QuestionPapers = () => {
  const { user } = useContext(userContext);
  const [doc_link, setDocLink] = useState<null | string>(null);
  const [subject, setSubject] = useState<string>(user?.subject[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paper, setPapers] = useState<null | any[]>(null);

  async function fetch_papers() {
    const data = await get_paper(subject)
    setPapers(data.data)
  }
  useEffect(() => {
    fetch_papers();
  }, [subject])

  return (
    <Layout >
      <main
        className='h-[calc(100vh-160px)]'
      >
        <main className="pt-6 bg-slate-200 pb-6 px-8 flex items-center justify-between">
          <p className="text-lg">
            Showing applications for
            <span className="text-purple-600 font-bold ml-2">{subject}</span>
          </p>
          <div className="">
            {user?.subject.map((sub, index) => {
              return (
                <span
                  key={index}
                  onClick={() => setSubject(sub)}
                  className={`cursor-pointer  border border-current bg-white-600 px-4 py-2 rounded-md ml-2 ${subject === sub
                    ? "bg-purple-700 text-white"
                    : "text-purple-600"
                    }`}
                >
                  {sub}
                </span>
              );
            })}
          </div>
        </main>
        <main
          className='flex flex-col h-full md:flex-row w-full'
        >
          <section
            className='w-full py-8 md:w-1/3 h-full overflow-y-auto space-y-4 border-r'
          >
            {
              paper?.map((data) =>

                <details
                  key={data?._id}
                  className='bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all'
                >
                  <summary
                    className='bg-slate-200 p-2  rounded-md'
                  >
                    {data.setter.name}
                  </summary>
                  <div
                    className='flex pt-4 items-center'
                  >
                    <button
                      onClick={() => setDocLink(data.file_url)}
                    >
                      View
                    </button>
                    <button>Accept</button>
                  </div>
                </details>
              )
            }
          </section>
          <section
            className='w-full h-full flex justify-center overflow-y-auto md:w-2/3 border-l'
          >

            {
              !doc_link &&
              <>

                <div
                  className='w-full text-center mt-12 h-max text-2xl font-bold text-slate-300'
                >
                  Click on document link to preview
                </div>
              </>
            }
            {
              doc_link &&

              <>
                <button
                  onClick={() => setDocLink(null)}
                  className='bg-red-600 text-white absolute top-20 w-10 h-10 rounded-full text-3xl right-10'
                >
                  &times;
                </button>
                <div
                  className='w-full '
                >

                  <FileViewer
                    key={doc_link}
                    fileType={'pdf'}
                    filePath={doc_link}
                  />
                </div>
              </>
            }
          </section>
          {/* <audio src="http://localhost:6789/static/SarangaDariya-Telugu-wapinmp3.mpeg" controls>audio</audio>  */}
        </main>
      </main>

    </Layout >
  )
}

export default QuestionPapers