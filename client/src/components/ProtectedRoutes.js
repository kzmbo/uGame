import React from 'react'
import { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import cookies from 'react-cookies'

const ProtectedRoutes = () => {
  const { authUser, setAuth } = useContext(AuthContext)
  const location = useLocation()

  const session = cookies.load('uGameSession')

  return(
    <>
      {(session !== undefined) ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />}
    </>
    
  )
}

export default ProtectedRoutes