import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supaBaseclient';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                // User is logged in, check if they have a role
                const userRole = session.user?.user_metadata?.role;

                if (userRole) {
                    // Navigate to the appropriate dashboard
                    navigate(userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard', { replace: true });
                } else {
                    // User needs to select a role
                    navigate('/select-role', { replace: true });
                }
            }
        };

        checkUser();
    }, [navigate]);

    // Handle personal email login/signup
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignup) {
                // Sign up new user
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { firstName, lastName, role }
                    }
                });

                if (signUpError) throw signUpError;

                if (data?.user) {
                    // Also create a profile record
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([{
                            id: data.user.id,
                            first_name: firstName,
                            last_name: lastName,
                            role: role,
                            email: email
                        }]);

                    if (profileError) throw profileError;

                    // Navigate to dashboard based on role
                    navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard', { replace: true });
                }
            } else {
                // Login existing user
                const { data, error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (loginError) throw loginError;

                if (data?.user) {
                    const userRole = data.user?.user_metadata?.role;

                    if (userRole) {
                        // Navigate to the appropriate dashboard
                        navigate(userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard', { replace: true });
                    } else {
                        // User needs to select a role
                        navigate('/select-role', { replace: true });
                    }
                }
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/select-role`
                }
            });

            if (error) throw error;
            // Redirect will happen automatically
        } catch (err) {
            console.error('Google login error:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    const handleRoleSelection = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">{isSignup ? 'Create your account' : 'Welcome back'}</h2>

            {/* Personal Email Login */}
            {!isSignup && (
                <form className="login-form" onSubmit={handleEmailLogin}>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            )}

            {/* Personal Email Sign Up */}
            {isSignup && (
                <form className="login-form" onSubmit={handleEmailLogin}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="role-selection">
                        <label className="role-option">
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={role === 'teacher'}
                                onChange={handleRoleSelection}
                                required
                            />
                            Teacher
                        </label>
                        <label className="role-option">
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
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            )}

            {/* Divider */}
            <div className="divider">
                <span className="divider-text">or</span>
            </div>

            {/* Google OAuth */}
            <div className="oauth-container">
                <button
                    className="google-button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    {loading ? 'Processing...' : 'Sign in with Google'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
                className="toggle-form"
                onClick={() => setIsSignup(!isSignup)}
                disabled={loading}
            >
                {isSignup ? 'Already have an account? Log in' : 'New here? Create an account'}
            </button>
        </div>
    );
};

export default Login;