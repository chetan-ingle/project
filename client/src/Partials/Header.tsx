import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

const Header = () => {
  const { setUser, user } = useContext(userContext);
  const navigate = useNavigate()
  useEffect(() => {
    user ? navigate('/dashboard') : navigate('/login')
  }, [user])
  return (
    <header
      className='bg-white fixed w-full px-6 py-4 flex items-center justify-between'
    >
      <div
        className='text-lg flex items-center font-semibold'
      >
        <img src="/icon.png" alt="Logo" />
        <span
          className='mx-2'
        >
          Chetu
        </span>
      </div>
      <nav
        className='space-x-3 text-sky-600'
      >
        <Link to={'/login'}>
          Login
        </Link>

        <Link to={'/dashboard'}>
          Dashboard
        </Link>
        <Link
          title={'Profile | ' + user}
          className='underline font-bold text-slate-800'
          to={'/profile'}>
          {user}
        </Link>
      </nav>
    </header>
  )
}

export default Header