import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import Axios from 'axios'

const Signup = () => {
    //For getting values from the textfield and creating a user
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Errors msgs that would display if the values are empty or too long/short
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState('')

    // Shows a msg that displays when sign up was successful or not
    const [signUpMsg, setSignUpMsg] = useState('')

    const [isSignedUp, setSignUpStatus] = useState(false)

    const createUserURI = 'http://localhost:4000/signup'

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const createUser = () => {
        Axios.post(createUserURI, {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            if (response.data.isSignedUp) setSignUpStatus(true)
            setSignUpMsg(response.data.msg)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='bg-login-signup'>
            <div className='login-signup-banner'>
                <h1 className='logo-header-banner'>uGame</h1>
                <div className='banner-img-container'>
                    <img src={require('./../img/source2.PNG')} className='banner-img'/>
                </div>
                <div className='banner-section'>
                    <p className='py-5'>Wanna keep track of all of the games you played?</p>
                    <p className=''>Thanks to the <a href='https://rawg.io/apidocs' rel='noopener' className='text-blue'>RAWG API</a>, we got you cover with their database of 500,000+ games across 50 platforms.</p>
                </div>
            </div>
            <div className='login-sign-section relative'>
                <h1 className='logo-header'>uGame</h1>
                <p className='my-14 md:my-20 lg:my-8'></p>
                <div className=''>
                    <h3 className='header-login-signup'>Sign Up</h3>
                    <form className='grid grid-cols-1 place-content-center'>
                        <label className='text-field-labels'>Username</label>
                        <input type="text" className='text-field' onChange={(e) => {
                                const usernameTemp = e.target.value
                                if (usernameTemp.length < 3 || usernameTemp.length > 20) return setUsernameErrorMsg('Username must be between 3-20 characters.')
                                else setUsernameErrorMsg('')
                                return setUsername(usernameTemp)
                            }} />
                        <p className='error-textfield'>{usernameErrorMsg}</p>

                        <label className='text-field-labels'>Email</label>
                        <input type="text" className='text-field' onChange={(e) => {
                                const emailTemp = e.target.value
                                if (!emailTemp.match(emailFormat)) return setEmailErrorMsg('Invalid Email')
                                else setEmailErrorMsg('')
                                return setEmail(emailTemp)
                            }} />
                        <p className='error-textfield'>{emailErrorMsg}</p>

                        <label className='text-field-labels'>Password</label>
                        <input type="password" className='text-field' onChange={(e) => {
                                const passwordTemp = e.target.value
                                if (passwordTemp.length < 5) return setPasswordErrorMsg('Password must be at least 5 characters long.')
                                else setPasswordErrorMsg('')
                                return setPassword(passwordTemp)
                            }} />
                        <p className='error-textfield'>{passwordErrorMsg}</p>

                        
                        <button className='login-signup-btn' onClick={(e) => {
                            e.preventDefault()
                            createUser()
                        }}>Sign Up</button>
                        <p className='error-textfield mb-5'>{signUpMsg}</p>
                    </form>
                    <div className='subtext-login-signup'>
                        <p className='font-2xl font-semibold'>Have an account already?</p>
                        <Link to='/login'>
                            <p className='text-dark-blue font-lg font-normal'>Log in here!</p>
                        </Link>
                    </div>
                </div>
                <p className='absolute bottom-5 right-5'>Wanna contribute? <a className='text-dark-blue ' href='https://github.com/kzmbo/uGame/tree/main' rel='noopener' >Check out my repo on GitHub!</a></p>
            </div>
            {isSignedUp ? (<Navigate to='/login' replace={true} />): null}
        </div>
    )
}

export default Signup