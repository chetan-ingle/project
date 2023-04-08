import React, { ReactNode } from 'react'
import Header from './Header'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className='w-full relative min-h-screen bg-slate-100 pb-8'
    >
      {/* natification */}
      <Header />
      <div
        className='h-full w-full pt-16'
      >
        {children}
      </div>
    </div>
  )
}

export default Layout