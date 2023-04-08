import React, { createContext, ReactNode, useState } from 'react'
export const userContext = createContext<{ user?: any, setUser?: any }>({})
const UserContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>();
  
  return (
    <userContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContext