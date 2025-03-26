import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation } from 'react-router-dom';

const Land = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { age, occupation, tobacco, coverage } = location.state || {};

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/chat", {
                state: { age, coverage, tobacco, occupation },
            });
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert(error.message);
        }
    };

    return (
        <div className='signin-back'>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4 sign-in-box">
                    <h3 className="card-title text-center">Sign In</h3>
                    <div className="form-main">
                        <button
                            type="button"
                            className="btn btn-block"
                            onClick={handleGoogleSignIn}
                        >
                            Sign In with Google <FcGoogle size={32} />
                        </button>
                        <div className="mt-3">
                            Don't have an account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Land;
