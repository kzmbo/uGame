import React from 'react'
import Axios from 'axios'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import cookies from 'react-cookies'
import { AuthContext } from '../context/AuthProvider'

// Responsible for ensuring that user can log back in within 30 mins
const UserPersistance = () => {

    // Finds session named 'uGameSession'
    const session = cookies.load('uGameSession')
    
    /*
        authUser : {
        userID (String),
        sid (String),
        user ({..} see user.js in server/models/)
        }
    */
    const { authUser, setAuth } = useContext(AuthContext)

    // Checks to see if user has an existing session. 
    // If so, log back in. If not, go to the login page
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