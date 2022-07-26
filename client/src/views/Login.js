import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    // Changing user auth state
    const {authUser, setAuth} = useContext(AuthContext)

    //For getting values from the textfield and creating a user
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Errors msgs that would display if the values are empty or too long/short
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState('')

    // Shows a msg that displays when sign up was successful or not
    const [loginMsg, setLoginMsg] = useState('')

    const [isLogin, setLoginStatus] = useState(false)

    const loginUserURI = 'http://localhost:4000/login'

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    const loginUser = () => {
        Axios.post(loginUserURI, {
            email: email,
            password: password
        })
        .then((response) => {
            const isLoggedIn = response.data.isLoggedIn
            const user = response.data
            if (isLoggedIn) {
                setAuth(user)
                navigate(`/dashboard/${user.userID}`, {replace: true})
            } else {
                setLoginMsg("Unable to find user. Please try again!")
            }
           
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='bg-login-signup'>
            <div className='login-signup-banner'>
                <h1 className='logo-header-banner'>uGame</h1>
                <div className='banner-section'>
                    <p className='py-5'>Wanna keep track of all of the games you played?</p>
                    <p className=''>Thanks to the <a href='https://rawg.io/apidocs' target="_blank" className='text-blue'>RAWG API</a>, we got you cover with their database of 500,000+ games across 50 platforms.</p>
                </div>
            </div>
                
            <div className='login-sign-section relative'>
                <h1 className='logo-header'>uGame</h1>
                <p className='my-14 md:my-20 lg:my-8'></p>
                <div className=''>
                    <h3 className='header-login-signup'>Log In</h3>
                    <form className='grid grid-cols-1 place-content-center'>
                        <label className='text-field-labels'>Email</label>
                        <input type="text" className='text-field' onChange={(e) =>{
                                const emailTemp = e.target.value
                                if (!emailTemp.match(emailFormat)) return setEmailErrorMsg('Invalid Email')
                                else setEmailErrorMsg('')
                                return setEmail(emailTemp)
                            }} />
                        <p className='error-textfield'>{emailErrorMsg}</p>

                        <label className='text-field-labels'>Password</label>
                        <input type="password" className='text-field' onChange={(e) => {
                                const passwordTemp = e.target.value
                                if (passwordTemp.length === 0) return setPasswordErrorMsg('Must enter a password!')
                                else setPasswordErrorMsg('')
                                return setPassword(passwordTemp)
                            }} />
                        <p className='error-textfield'>{passwordErrorMsg}</p>

                        <button className='login-signup-btn' onClick={(e) => {
                            e.preventDefault()
                            loginUser()
                        }}>Login</button>
                        <p className='error-textfield mb-5'>{loginMsg}</p>
                    </form>
                    <div className='subtext-login-signup'>
                        <p className='font-2xl font-semibold'>Don't have an account</p>
                        <Link to='/signup'>
                            <p className='text-dark-blue font-lg font-normal'>Sign up here!</p>
                        </Link>
                    </div>
                </div>
                <p className='absolute bottom-5 right-5'>Wanna contribute? <a className='text-dark-blue ' href='https://github.com/kzmbo/uGame/tree/main' target='_blank'>Check out my repo on GitHub!</a></p>
            </div>
        </div> 
    )
}

export default Login