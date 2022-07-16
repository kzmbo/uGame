import React from 'react'
import Axios from 'axios'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import cookies from 'react-cookies'

const UserPersistance = () => {
    const session = cookies.load('uGameSession')

    return (
        <>
            {(session !== undefined)  ? <Navigate to='/dashboard' replace={true} /> : <Navigate to='/login' replace={true}/>}
        </>
        
    )
}

export default UserPersistance