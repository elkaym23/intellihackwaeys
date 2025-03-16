import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supaBaseclient';
import './login.css';

const SelectRole = () => {
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user found');

            // Update user metadata
            const { error: updateError } = await supabase.auth.updateUser({
                data: { role }
            });

            if (updateError) throw updateError;

            // Create or update profile
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    role,
                    updated_at: new Date()
                });

            if (profileError) throw profileError;

            // Redirect based on role
            navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Select Your Role</h2>

            <form className="google-role-form" onSubmit={handleRoleSubmit}>
                <h3>How will you use this platform?</h3>

                <div className="role-selection">
                    <label className="role-option">
                        <input
                            type="radio"
                            name="role"
                            value="teacher"
                            checked={role === 'teacher'}
                            onChange={(e) => setRole(e.target.value)}
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
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Student
                    </label>
                </div>

                <button
                    className="submit-button"
                    type="submit"
                    disabled={!role || loading}
                >
                    {loading ? 'Processing...' : 'Continue'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SelectRole;