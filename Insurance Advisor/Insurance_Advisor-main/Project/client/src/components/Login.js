import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Land = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = '/details'; // Redirect to the dashboard or home page after sign-in
        } catch (error) {
            console.error("Error signing in with password and email", error);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = '/details'; // Redirect to the dashboard or home page after Google sign-in
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert(error.message);
        }
    };

    return (
        <div className='signin-back'>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="p-4 sign-in-box">
                    <h3 className="card-title text-center">Sign In</h3>
                    <form onSubmit={handleSignIn}>
                        <div className="form-main">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary btn-block mx-5">Sign In</button>
                            <br />
                            <button
                                type="button"
                                className="btn btn-block  mt-3"
                                onClick={handleGoogleSignIn}
                            >

                                Sign In with Google <FcGoogle size={32} />
                            </button>
                            <div>Don't have an account? <Link to='/signup'>Sign Up</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Land;
