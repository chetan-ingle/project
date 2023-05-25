import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Layout from '../Partials/Layout'
import FileViewer from 'react-file-viewer';
import { FileUploader } from "react-drag-drop-files";
import { delete_material, put_material } from '../service/material.service';
import { userContext } from '../../Context/UserContext';
import { toast } from 'react-hot-toast';
import useMaterial from '../hooks/useMaterial';
import { AiFillDelete } from 'react-icons/ai'

const UploadSyllabus = () => {
  const { moderator :user } = useContext(userContext)
  const [doc_link, setDocLink] = useState<null | string>(null);
  const [upload_doc, set_upload_doc] = useState<boolean>(false);
  const [name, setName] = useState<null | string>(null);
  const [type, setType] = useState<null | string>(null);
  const [subject, setsubject] = useState<string>('');
  const [doc, setDoc] = useState<null | File>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function submit_material(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name) {
      alert('Name is required.')
      return
    }
    if (!doc) {
      alert('Please select file.')
      return
    }
    if (!type) {
      alert('Please choose file type.')
      return
    }
    if (!type) {
      alert('Please select subject')
      return
    }
    setLoading(true)
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('file', doc);
    formdata.append('type', type);
    formdata.append('subject', subject);
    formdata.append('by', user?._id);
    const akg = await put_material(formdata);
    setLoading(false);
    set_upload_doc(false);
    toast.success('Material uploaded successfully', { position: 'top-right' });
    e.target.reset();
    setDoc(null)
    // refetch uploaded docs
    refetch();
  }
  const { data, loading: fetching, refetch } = useMaterial({id:user?._id });
  const material_data = [
    {
      title: 'Syllabus',
      data:
        data && data?.filter((i: any) => i.type === 'syllabus'),
    },
    {
      title: 'Paper format',
      data: data && data?.filter((i: any) => i.type === 'format'),
    },
    {
      title: 'Material',
      data: data && data?.filter((i: any) => i.type === 'material'),
    }
  ];

  async function handle_delete(id: string, name: string) {
    if (confirm(`Do you really want to delete '${name}' ?`)) {
      setDocLink(null)
      const tsid = toast.loading("Please wait...", { position: 'top-right' })
      const data = await delete_material(id);
      toast.dismiss(tsid);
      data.success
        ? toast.success(`'${name}' deleted successfully.`, { position: 'top-right' })
        : toast.error(data.message, { position: 'top-right' });
      refetch();
    }
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
          onSubmit={submit_material}
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

            Upload material here
          </h4>
          <label htmlFor="subject"
            className='text-lg font-medium block'
          > Select subject :</label>
          <select id="subject"
            onChange={e => setsubject(e.target.value)}
            className='w-full bg-transparent py-2 px-4 outline-none ring-0 my-4 border rounded-md'
          >
            <option value="">---Select subject---</option>
            {
              user?.subject.map((item: string) =>

                <option key={item} value={item} className='capitalize'>{item}</option>
              )
            }

          </select>
          <label htmlFor="type"
            className='text-lg font-medium block'
          > Select material type :</label>
          <select id="type"
            onChange={e => setType(e.target.value)}
            className='w-full bg-transparent py-2 px-4 outline-none ring-0 my-4 border rounded-md'
          >   <option value="">---Select type---</option>
            <option value="format">Paper format</option>
            <option value="syllabus">Syllabus</option>
            <option value="material">Material</option>
          </select>
          <label htmlFor="desc"
            className='text-lg font-medium block'
          > Description :</label>
          <input
            onChange={e => setName(e.target.value)}
            className='w-full bg-transparent py-2 px-4 outline-none ring-0 my-4 border rounded-md'
            type="text" id='desc' placeholder='eg. previous exam papers' />
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
          Uploaded content will be shown here.
        </h2>
        <main
          className='flex flex-col h-full md:flex-row w-full'
        >
          <section
            className='w-full md:w-1/3 h-full overflow-y-auto space-y-4 border-r'
          >
            {
              material_data.map(({ data, title }) =>

                <details
                  key={title}
                  className='bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all'
                >
                  <summary
                    className='bg-slate-200 p-2  rounded-md'
                  >
                    {title}
                  </summary>
                  <div
                    className='flex pt-4 flex-col space-y-3'
                  >
                    {
                      data?.map((item: { desc: string, url: string, _id: string , subject : string}) =>
                        <div
                          key={item._id}
                          className='flex py-2 justify-between px-4 items-center bg-slate-100'
                        >
                          <button
                            className=' text-left flex  items-center'
                            onClick={() => setDocLink('http://localhost:6789/static/' + item?.url)}
                          >
                            <p
                            className='underline'
                            >
                              {item.desc}
                            </p>
                            <small className='px-2 text-red-500 text-sm no-underline'>
                            (  {item.subject})
                            </small>
                          </button>
                          <span
                            onClick={() => handle_delete(item?._id, item.desc)}
                            className='text-red-500 cursor-pointer'
                          >
                            <AiFillDelete />
                          </span>
                        </div>
                      )
                    }
                    {
                      !data?.length ?
                        <h4>No data found.</h4>
                        : null
                    }
                  </div>
                </details>
              )
            }
            <button
              onClick={() => { setDocLink(null); set_upload_doc(true) }}
              className='bg-slate-700 text-white rounded-md text-lg py-2 w-11/12 mx-auto block'
            >
              Add meterial
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

export default UploadSyllabus