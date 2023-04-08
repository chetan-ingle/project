import React, { useContext } from 'react'
import { userContext } from '../../Context/UserContext';
import Layout from '../Partials/Layout'
import loginService from '../service/login.service';
import query from '../service/query.service';
import extractFormData from '../utils/extractFormData';

const Login = () => {
  const { setUser, user } = useContext(userContext);

  async function handleLogin(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = extractFormData(e.target);
    const { data, error, message } = await query(loginService, params);
    console.log(error, message, data)
    setUser(params.username)
  }
  return (
    <Layout>

      <main
        className='h-screen w-screen grid place-items-center'
      >
        <section
          className='max-w-[500px] w-11/12 p-6 md:p-12 rounded-lg bg-white shadow-lg'
        >
          <h4
            className='text-lg pb-4 md:text-xl font-bold'
          >
            Login here
          </h4>
          <form
            onSubmit={handleLogin}
            className='flex flex-col'
          >
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              name='username'
              className='border mb-4 mt-2 rounded-lg px-4 py-2'
            />

            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name='password'
              className='border mb-4 mt-2 rounded-lg px-4 py-2'
            />
            <button
              className='block bg-purple-800 text-white py-3 px-4 rounded-lg font-bold'
            >
              Login
            </button>
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default Login
