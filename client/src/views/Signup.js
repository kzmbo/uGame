import React from 'react'
import { Link } from "react-router-dom"
import Login from './Login'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [signUpErrorMsg, setSignUpErrorMsg] = useState('')
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState('')

    const createUserURI = 'http://localhost:5000/signup'

    const createUser = () => {
        if (username.length === 0 || email.length === 0 || password.length === 0) return setSignUpErrorMsg('Invalid Input') 
        Axios.post(createUserURI, {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            setSignUpSuccessMsg('Successfully Signed Up!')
            setSignUpErrorMsg('')
            console.log(response)        
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
                    <h3 className='header-login-signup'>Sign Up</h3>
                    <form className='grid grid-cols-1 place-content-center'>
                        <label className='text-field-labels'>Username</label>
                        <input type="text" className='text-field' />

                        <label className='text-field-labels'>Email</label>
                        <input type="text" className='text-field' />

                        <label className='text-field-labels'>Password</label>
                        <input type="password" className='text-field' />

                        
                        <button className='login-signup-btn'>Sign Up</button>
                    </form>
                    <div className='subtext-login-signup'>
                        <p>Have an account already?</p>
                        <Link to='/login'>
                            <p className='text-blue'>Log in here!</p>
                        </Link>
                    </div>
                </div>
                <p className='absolute bottom-5 right-5'>Wanna contribute? <a className='text-blue' href='https://github.com/kzmbo/uGame/tree/main' target='_blank'>Check out my repo on GitHub!</a></p>
            </div>

        </div>
    )
}

export default Signup