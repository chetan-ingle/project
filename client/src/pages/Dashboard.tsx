import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import Layout from '../Partials/Layout'
import { getApplication } from '../service/application.service';
import query from '../service/query.service';
export interface ApplicationType {
  _id: string;
  name: string;
  college_id: string;
  experience: number;
  qualification: string;
  institute: string;
  subject: string[];
  email: string;
  phone: string;
  address: string;
  profile: string;
  password: string;
  previousWork: string[];
  __v: number;
}
const Dashboard = () => {
  const { user, setUser } = useContext(userContext);
  const [apps, setApps] = useState<ApplicationType[] | null>(null)
  const getApplications = async () => {
    const { data, error, message } = await query(getApplication, null);
    setApps(data)
    console.log(data, error, message)
  }
  useEffect(() => {
    getApplications();
  }, [])
  return (
    <Layout>
      <main className='w-[98%] rounded-md bg-white mx-auto mt-8 text-slate-700'>
        <h4
          className='text-2xl p-6 font-bold'
        >
          Paper setter application
        </h4>
        {/* {use} */}
        <hr />
        <div
          className='notification fixed shadow-xl border notification-success notification-danger'
        >
          <h4
            className='notification-content'
          >
            Hello, Notification.
          </h4>
          <span
            className='notification-slider'
          ></span>
        </div>
        {/* application table */}
        <section
          className='w-full overflow-x-auto'
        >
          <table
            className='application-table mt-6 w-max min-w-full'
          >
            <thead
              className='bg-purple-700 font-semibold  text-white'
            >
              <tr
              >
                <td
                className='py-4'
                >
                  Sr no.
                </td>
                <td>
                  Photo
                </td>
                <td>
                  Name
                </td>
                <td>
                  Email
                </td>
                <td>
                  Phone
                </td>
                <td>
                  Subject(s)
                </td>
                <td>
                  Institute
                </td>
                <td>
                  College ID
                </td>
                <td>
                  Previous works
                </td>
              </tr>
            </thead>
            <tbody>
              {
                apps && apps.map(({ _id, email, college_id, institute, name, phone, profile, qualification, subject, previousWork, experience, }, index) => {
                  return <tr
                    className='border-b even:bg-purple-100'
                    key={_id}
                  >
                    <td
                      className='text-center'
                    >{
                        `${index + 1}`.padStart(3, '0')
                      }</td>
                    <td>
                      <img
                        className='w-16 h-16 rounded-full border border-purple-600 bg-purple-500 aspect-[3/4] object-cover'
                        src={profile} alt={name} />
                    </td>
                    <td>
                      {name}
                    </td>
                    <td>
                      {email}
                    </td>
                    <td>
                      {phone}
                    </td>
                    <td>
                      {
                        subject.join(', ')
                      }
                    </td>

                    <td>
                      {institute}
                    </td>
                    <td>
                      <a href={college_id} target={'_blank'} className='underline text-sky-800'>
                        View
                      </a>
                    </td>
                    <td>
                      {previousWork.join(', ')}
                    </td>
                  </tr>
                })
              }

            </tbody>
            <tfoot></tfoot>
          </table>
          {/* loading */}
          {
            !apps
              ? <div
                className='text-4xl font-black text-purple-200 text-center py-8'
              >
                Loading...
              </div>
              : null
          }
          {
            (apps && !apps.length)
              ? <div
                className='text-4xl font-black text-purple-200 text-center py-8'
              >
                No records found.
              </div>
              : null
          }
        </section>
      </main>
    </Layout>
  )
}

export default Dashboard