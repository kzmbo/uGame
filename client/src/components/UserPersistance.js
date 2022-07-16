import React from 'react'
import { Outlet } from 'react-router-dom'

const UserPersistance = (req, res) => {
    console.log(req.session)
    return (
        <Outlet />
    )
}

export default UserPersistance