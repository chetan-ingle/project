import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Layout from '../Partials/Layout'
import FileViewer from 'react-file-viewer';
import { FileUploader } from "react-drag-drop-files";
import { userContext } from '../../Context/UserContext';
import { toast } from 'react-hot-toast';


const UploadPaper = () => {
  const { moderator: user } = useContext(userContext)
  const [doc_link, setDocLink] = useState<null | string>(null);
  const [upload_doc, set_upload_doc] = useState<boolean>(false);

  const [doc, setDoc] = useState<null | File>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function submit_paper(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true)
    const formdata = new FormData();

    formdata.append('by', user?._id);
    const akg = await put_material(formdata);
    setLoading(false);
    set_upload_doc(false);
    toast.success('Material uploaded successfully', { position: 'top-right' });
    e.target.reset();
    setDoc(null)

  }

  return (
    <Layout >
      <main
        style={{
          opacity: upload_doc ? '1' : '0',
          visibility: upload_doc ? 'visible' : 'collapse'
        }}
        className='fixed duration-500 transition-all inset-0 bg-black/60 grid place-items-center backdrop-filter backdrop-blur-[1px]'
      >

        <form
          onSubmit={submit_paper}
          className=' relative rounded-lg w-11/12 max-w-[600px] bg-white border-dotted border-2 p-8 px-12'
        >
          <button
            type='button'
            onClick={() => set_upload_doc(false)}
            className='hover:bg-red-100 text-red-600 absolute top-2 w-10 h-10 rounded-full text-3xl right-2'
          >
            &times;
          </button>
          <h4
            className='text-2xl font-semibold mb-8'
          >

            Upload paper here
          </h4>
          <label htmlFor="subject"
            className='text-lg font-medium block'
          > Subject : <b>
              {user?.subject?.name}</b></label>

          <label htmlFor="type"
            className='text-lg font-medium block'
          > Subjec code: <strong>{user?.subject?.code}</strong></label>
          <br />
          <FileUploader
            className='bg-red-400'
            types={['pdf']}
            hoverTitle={null}
            handleChange={(file: File) => setDoc(file)}
          >
            {doc &&
              <h4
                className='bg-green-500 text-slate-800 px-4 py-2 rounded-md mb-4'
              >
                Selected file : ({doc.name})
              </h4>
            }
            <div
              className='text-center py-6 p-4 bg-slate-200 rounded-md border-dotted border-2'
            >
              <p
                className='text-lg'
              >
                Drop file here.
              </p>
              <p>
                or
              </p>
              <small
                className='underline'
              >
                Select from file manager
              </small>
            </div>

          </FileUploader>
          <button
            disabled={loading}
            className='bg-slate-700 text-white py-2 px-6 rounded-md mt-4'
          >
            {
              loading
                ? 'Please wait'
                : 'Submit'
            }
          </button>
        </form>
      </main>

      <main
        className='h-[calc(100vh-160px)]'
      >
        <h2
          className="p-8 text-xl font-semibold"
        >
          Upload Paper .
        </h2>
        <main
          className='flex flex-col h-full md:flex-row w-full'
        >
          <section
            className='w-full md:w-1/3 h-full overflow-y-auto space-y-4 border-r'
          >
            <p
              className='px-6'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta dolores consequuntur, veniam ut vitae, nemo rerum optio voluptatem beatae numquam doloribus tempora aliquid. Sint corrupti cumque, reprehenderit assumenda at adipisci placeat facere!
            </p>
            <p
              className='px-6'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta dolores consequuntur, veniam ut vitae, nemo rerum optio voluptatem beatae numquam doloribus tempora aliquid. Sint corrupti cumque, reprehenderit assumenda at adipisci placeat facere!
            </p>

            <button
              onClick={() => { setDocLink(null); set_upload_doc(true) }}
              className='bg-slate-700 text-white rounded-md text-lg py-2 w-11/12 mx-auto block'
            >
              Upload paper
            </button>
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

export default UploadPaper