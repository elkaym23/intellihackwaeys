import React, { useState, useEffect } from 'react';
import { supabase } from './supaBaseclient';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get current user
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            // Fetch assigned tasks
            if (user) {
                const { data, error } = await supabase
                    .from('tasks')
                    .select(`
                        *,
                        projects:project_id (name)
                    `)
                    .eq('student_id', user.id);

                if (error) console.error('Error fetching tasks:', error);
                else setTasks(data || []);
            }
            setLoading(false);
        };

        getCurrentUser();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    const handleUpdateTaskStatus = async (taskId, status) => {
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', taskId);

        if (error) {
            console.error('Error updating task status:', error);
        } else {
            // Update local state
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, status } : task
            ));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Student Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user?.user_metadata?.firstName || user?.email}</span>
                    <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="tasks-section">
                    <h2>My Tasks</h2>

                    <div className="tasks-list">
                        {tasks.length === 0 ? (
                            <p>No tasks assigned yet.</p>
                        ) : (
                            tasks.map(task => (
                                <div key={task.id} className="task-card">
                                    <h3>{task.task_name}</h3>
                                    <p>Project: {task.projects.name}</p>
                                    <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                                    <p>Status: {task.status || 'Pending'}</p>
                                    <div className="task-actions">
                                        <button
                                            onClick={() => handleUpdateTaskStatus(task.id, 'In Progress')}
                                            disabled={task.status === 'In Progress'}
                                        >
                                            Mark In Progress
                                        </button>
                                        <button
                                            onClick={() => handleUpdateTaskStatus(task.id, 'Completed')}
                                            disabled={task.status === 'Completed'}
                                        >
                                            Mark Complete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;