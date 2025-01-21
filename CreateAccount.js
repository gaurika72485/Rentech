import React, { useState } from 'react';
import './CreateAccount.css';
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

function CreateAccount() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name, email, address1, address2, pincode, city, state
            });
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='createAccount'>
            <Link to='/'>
                <img className="createAccount__logo" src={logo} alt="logo" />
            </Link>
            <div className='createAccount__container'>
                <div className='createAccount__title'>Create Account</div>
                <div className='createAccount__formWrapper'>
                    <form>
                        <h5>Name</h5>
                        <input type='text' value={name} onChange={e => setName(e.target.value)} />

                        <h5>E-mail</h5>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} />

                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                        <h5>Confirm Password</h5>
                        <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                        <h5>Address</h5>
                        <input type="text" placeholder="Address line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                        <input type="text" placeholder="Address line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                        <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />

                        <button type='submit' onClick={register} className='createAccount__registerButton'>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
