import React from 'react'
import { Link } from "react-router-dom"
import Signup from './Signup'

const Login = () => {
  return (
    <div className='bg-login-signup'>
        <h1 className='logo-header'>uGame</h1>
        <p className='my-14 md:my-20'></p>
        <div className=''>
            <h3 className='header-login-signup'>Log In</h3>
            <form className='grid grid-cols-1 place-content-center'>
                <label className='text-field-labels'>Email</label>
                <input type="text" className='text-field' />
                <label className='text-field-labels'>Password</label>
                <input type="password" className='text-field' />
                <button className='login-signup-btn'>Login</button>
            </form>
            <div className='subtext-login-signup'>
                <p>Don't have an account</p>
                <Link to='/signup'>
                    <p className='text-blue'>Sign up here!</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login