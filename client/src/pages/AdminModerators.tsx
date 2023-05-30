import React, { ChangeEvent, useEffect, useState } from 'react'
import Layout from '../Partials/Layout'
import { BASE_URL } from '../utils/static'
import { toast } from 'react-hot-toast'
import { useSubject } from '../hooks/useMaterial'
import extractFormData from '../utils/extractFormData'

function AdminModerators() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [formload, setformload] = useState(false);
  const [gettingSubject, setGettingSubject] = useState(false)
  const [existingSubjects, setExistingSubjects] = useState<any[]>([])
  async function get_moderators() {
    setLoading(true)
    const req = await fetch(`${BASE_URL}/moderator`);
    const { data, error, message } = await req.json();
    setData(data)
    setLoading(false);
    error ? toast.error(message) :
      toast.success(message)
  }
  async function get_subjects_assigned() {
    setGettingSubject(true)
    const req = await fetch(`${BASE_URL}/moderator/subjects/assigned`);
    const { data, error, message } = await req.json();

    setGettingSubject(false);
    setExistingSubjects(data)
    error ? toast.error(message) :
      toast.success(message)
  }

  const { data: subjects, loading: fetching, refetch } = useSubject();

  async function handle_create_examiner(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setformload(true)
    const data = extractFormData(e.target);
    const formdata = new FormData(e.target)
    const subs = subjects?.filter(item => {
      return formdata.getAll('subject').includes(item.code)
    }) || []


    if (subs.length < 1 || subs.length > 3) {
      toast.error('Please select at least 1 and maximun 3 subjects.');
      setformload(false)
      return
    }
    const payload = {
      ...data,
      password: data.phone,
      subject: subs,
    }

    const req = await fetch(`${BASE_URL}/admin/create/moderator`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    });

    const { error, message } = await req.json()
    setformload(false)
    get_moderators()
    get_subjects_assigned()
    error ? toast.error(message) : toast.success(message);
    e.target.reset()
  }

  useEffect(() => {
    get_moderators();
    get_subjects_assigned();
  }, []);

  return (
    <Layout>
      <main className="h-[calc(100vh-160px)]">
        <h2 className="p-8 text-xl font-semibold">
          All examiners.
        </h2>
        <main className="flex flex-col h-full md:flex-row w-full">
          <section className="w-full md:w-1/3 h-full overflow-y-auto space-y-4 border-r">
            {
              loading && <h4
                className='w-11/12 mx-auto p-4 bg-slate-200'
              >
                Loading
              </h4>
            }
            {
              data.length > 0 ? data.map((item: any) =>
                <details
                  key={item?._id}
                  style={{
                    display: loading ? 'none' : 'flex'
                  }}
                  className="bg-slate-50 rounded-md border w-11/12 mx-auto py-6 px-4 duration-300 transition-all"
                >
                  <summary title={` ${item.name} from ${item.institute}, ${item.institute_address}`} className="bg-slate-200 line-clamp-1 underline p-2 flex rounded-md">
                    {item.name} from {item.institute}, {item.address}
                  </summary>
                  <div className="flex pt-4 flex-col space-y-3">
                    <div

                      className="p-4 sapce-y-3 bg-slate-100"
                    >

                      <p>
                        Email : <strong> {item?.email}</strong>
                      </p>
                      <p>
                        Phone : <strong>{item?.phone}</strong>
                      </p>
                      <div
                        className='pt-2 border-t mt-2'
                      >
                        <details>
                          <summary
                            className='flex underline'
                          >

                            <strong>
                              <h4>
                                Subjects <small>(click to expand)</small>
                              </h4>
                            </strong>
                          </summary>
                          <ul
                            className='list-inside list-disc'
                          >

                            {
                              item?.subject?.map((item: any) =>
                                <li
                                  key={item?.name}
                                >
                                  {item?.name}({item?.code})
                                </li>
                              )
                            }
                          </ul>
                        </details>
                      </div>
                      {/* <button
                        className="py-2 px-4 bg-red-500 text-white rounded-full text-xs mt-4  text-left"
                      >
                        Delete
                      </button> */}

                    </div>
                  </div>
                </details>
              )
                : !loading && <h4
                  className='w-11/12 mx-auto p-4 bg-slate-200'
                >
                  No moderators found.
                </h4>
            }

          </section>
          <section className="w-full h-full px-6 overflow-y-auto md:w-2/3 border-l">
            <h3
              className='text-xl font-semibold'
            >
              Add moderator
            </h3>
            <form
              onSubmit={handle_create_examiner}
              className="" >
              <div
                className='flex'
              >


                <section
                  className='w-1/3 flex py-6 p-5 mt-4 rounded-lg flex-col'
                >
                  <label >Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="border mb-4 mt-2 rounded-lg px-4 py-2"
                  />
                  <label >Institute</label>
                  <input
                    required
                    type="text"
                    name="institute"
                    className="border mb-4 mt-2 rounded-lg px-4 py-2"
                  />
                  <label >Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="border mb-4 mt-2 rounded-lg px-4 py-2"
                  />
                  <label >Phone</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    className="border mb-4 mt-2 rounded-lg px-4 py-2"
                  />
                  <label >Address</label>
                  <input
                    required
                    type="text"
                    name="address"
                    className="border mb-4 mt-2 rounded-lg px-4 py-2"
                  />
                </section>
                <section
                  className='w-2/3 p-4'
                >
                  {
                    fetching && <h4
                      className='p-4 bg-slate-200 mb-2'
                    >
                      Getting subjects
                    </h4>
                  }
                  <h4
                    className='p-4 bg-slate-200 mb-2'
                  >
                    Choose subjects
                  </h4>
                  <main
                    className='flex flex-wrap border p-4'
                  >

                    {
                      !gettingSubject && subjects && subjects?.map((item) => {

                        return <div
                          key={item?.code}
                          className='space-x-1 mb-1 w-1/2'
                        >
                          <input disabled={existingSubjects.includes(item?.code)} name='subject' type="checkbox" value={item?.code} id={item?.code} />
                          <label
                            style={{
                              cursor: existingSubjects.includes(item?.code) ? "not-allowed" : 'pointer'
                            }}
                            htmlFor={item?.code}>
                            {item?.name}
                          </label>
                        </div>
                      })
                    }
                  </main>
                </section>
              </div>
              <button
                disabled={formload}
                className='bg-slate-700 px-6 ml-6 text-white rounded-md py-2 '
              >
                {
                  formload
                    ? 'Please wait....'
                    : ' Add examiner'
                }
              </button>
            </form>
          </section>

        </main>
      </main>
    </Layout >
  )
}

export default AdminModerators