// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after login
import { supabase } from '../supabaseClient'; // Assuming you've set up the supabaseClient.js
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false); // Whether it's a signup or login
    const [role, setRole] = useState(''); // To store selected role (Teacher or Student)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle personal email login/signup
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (isSignup) {
            try {
                const { user, error: signUpError } = await supabase.auth.signUp(
                    { email, password },
                    {
                        data: { firstName, lastName, role }, // Storing role information
                    }
                );

                if (signUpError) throw signUpError;
                // Redirect based on role after signup
                navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
            } catch (err) {
                setError(err.message);
            }
        } else {
            try {
                const { user, error: loginError } = await supabase.auth.signInWithPassword(
                    { email, password }
                );

                if (loginError) throw loginError;
                // Redirect based on role after login
                navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Handle third-party login (Google or Microsoft)
    const handleOAuthLogin = async (provider) => {
        try {
            const { user, session, error } = await supabase.auth.signInWithOAuth({
                provider,
            });

            if (error) throw error;
            // Redirect to dashboard after OAuth login
            navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle role selection after signup
    const handleRoleSelection = (e) => {
        setRole(e.target.value);
    };

    return (
        <div>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

            {/* Personal Email Login/Signup */}
            {!isSignup && (
                <form onSubmit={handleEmailLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            )}

            {/* Personal Email Sign Up */}
            {isSignup && (
                <form onSubmit={handleEmailLogin}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={role === 'teacher'}
                                onChange={handleRoleSelection}
                            />
                            Teacher
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={role === 'student'}
                                onChange={handleRoleSelection}
                            />
                            Student
                        </label>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            )}

            {/* OAuth Options */}
            <div>
                <button onClick={() => handleOAuthLogin('google')}>
                    Sign in with Google
                </button>
                <button onClick={() => handleOAuthLogin('microsoft')}>
                    Sign in with Microsoft
                </button>
            </div>

            <p style={{ color: 'red' }}>{error}</p>

            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Login' : 'New here? Sign Up'}
            </button>
        </div>
    );
};

export default Login;
