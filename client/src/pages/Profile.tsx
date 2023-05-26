import React, { useContext } from 'react'
import Layout from '../Partials/Layout'
import { userContext } from '../../Context/UserContext'

function Profile() {
  const { moderator: user } = useContext(userContext)
  return (
    <Layout>
      <main
      className='w-max mx-auto mt-8'
      >
        <pre
        className='bg-white shadow-md rounded-md p-8'
        >
          {JSON.stringify(user, null, 4)}
        </pre>
      </main>
    </Layout>
  )
}

export default Profile