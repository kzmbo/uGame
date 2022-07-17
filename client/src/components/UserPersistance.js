import React from 'react'
import Axios from 'axios'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import cookies from 'react-cookies'
import { AuthContext } from '../context/AuthProvider'

const UserPersistance = () => {
    const session = cookies.load('uGameSession')
    const { authUser, setAuth } = useContext(AuthContext)

    useEffect(() => {
        async function fetchUserId() {
            const response = await Axios.get('http://localhost:4000/login')
            console.log(response)
            const userID = response.data.userId ?? null
            const sid = response.data.sid ?? null
            const user = response.data.user ?? null
            setAuth({userID: userID, user: user, sid: sid})
        }
        fetchUserId()
    }, [])

    return (
        <>
            {(session !== undefined)  ? <Outlet /> : <Navigate to='/login' replace={true}/>}
        </>
        
    )
}

export default UserPersistance