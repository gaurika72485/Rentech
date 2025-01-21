import React, { useState } from 'react'
import './Login.css'
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from './firebase';

function Login() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault(); 
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/')
            })
            .catch(error => alert(error.message))
    }
    
    
    return (
        <div className='login'>
                <Link to='/'>
                    <img
                        className="login__logo"
                        src={logo}
                    />
                </Link>

                <div className='login__container'>
                    <div className='login__title'>Sign-in</div>

                    <form>
                        <h5>E-mail</h5>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>

                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                        <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                    </form>

                    <p>
                        By signing-in you agree to the FAKE Conditions of Use & Rent. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <p className='login__new'>
                        New to Gadget Valley?
                    </p>
                    <Link to='/create-account'>
                        <button  className='login__registerButton'>Create your Account</button>
                    </Link>
                </div>
            </div>
  )
}

export default Login