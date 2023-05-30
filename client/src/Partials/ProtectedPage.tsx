import React, { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext';

export const ProtectedPage = ({ role, acceptedRoles, children }: { role: string, acceptedRoles: string[], children: ReactNode }) => {
  const { moderator, setModerator } = useContext(userContext);
  if (moderator && !acceptedRoles.includes(role)) {
    return <Navigate to={'/'} />
  }
  return (
    <>
      {children}
    </>
  )
}
