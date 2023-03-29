import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                navigate('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to="/">
                <img className="login_logo" src="https://as2.ftcdn.net/v2/jpg/04/79/83/99/1000_F_479839974_RocNey49zGSxKpjsGWny9j0fvyZvEGdK.jpg" alt='' />
            </Link>
            <div className='login_container'>
                <h1>Sign In</h1>
                <form>
                    <h2>E-mail</h2>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    <h2>Password</h2>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' onClick={signIn} className="login_signInButton">Sign In</button>
                </form>
                <button onClick={register} className="login_registerButton" >Create an Account</button>
            </div>
        </div>
    )
}

export default Login;
