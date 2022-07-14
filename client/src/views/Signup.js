import React from 'react'
import { Link } from "react-router-dom"
import Login from './Login'

const Signup = () => {
  return (
    <div className='bg-login-signup'>
        <h1 className='logo-header'>uGame</h1>
        <p className='my-14'></p>
        <div className=''>
            <h3 className='header-login-signup'>Sign Up</h3>
            <form className='grid grid-cols-1 place-content-center'>
                <label className='text-field-labels'>Username</label>
                <input type="text" className='text-field' />
                <label className='text-field-labels'>Email</label>
                <input type="text" className='text-field' />
                <label className='text-field-labels'>Password</label>
                <input type="password" className='text-field' />
                <button className='login-signup-btn'>Sign Up In</button>
            </form>
            <div className='subtext-login-signup'>
                <p>Have an account already?</p>
                <Link to='/login'>
                    <p className='text-blue'>Log in here!</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Signup