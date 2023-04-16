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


//The useNavigate() hook returns a navigate function that can be called with a string representing the URL path to navigate to. When this function is called, the React Router library will update the URL in the browser address bar and render the appropriate component for the new route.

//useStateValue is not a built-in hook in React, but is likely a custom hook defined elsewhere in the codebase. It is commonly used with the React Context API to access global state from any component in the component tree without having to pass down props through each level of the tree.
//Vs
//useState is a built-in hook in React that allows you to add state to a functional component. It returns a tuple of two values: the current state value and a function to update the state. The initial state value can be passed as an argument to the useState hook


//e.preventDefault() to prevent the default form submission behavior, which would cause the page to reload.

//signInWithEmailAndPassword() method provided by an object named auth to authenticate the user with the email and password provided in the form fields. This method returns a promise that resolves with an auth object if the authentication is successful.

//createUserWithEmailAndPassword() method provided by an object named auth to create a new user with the email and password provided in the form fields. This method returns a promise that resolves with an auth object if the user creation is successful.







