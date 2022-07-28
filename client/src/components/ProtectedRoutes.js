import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import cookies from 'react-cookies'

// Responsible for ensuring that the dashboard can't be access publicly 
const ProtectedRoutes = () => {
  const location = useLocation()

  const session = cookies.load('uGameSession')

  return(
    <>
      {(session !== undefined) ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />}
    </>
    
  )
}

export default ProtectedRoutes