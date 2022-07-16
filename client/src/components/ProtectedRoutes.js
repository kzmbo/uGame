import React from 'react'
import { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import Login from '../views/Login'

const ProtectedRoutes = () => {
  const { authUser, setAuth } = useContext(AuthContext)
  const location = useLocation()

  return(
    <>
      {(Object.keys(authUser).length !== 0) ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />}
    </>
    
  )
}

export default ProtectedRoutes