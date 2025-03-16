import React, { useState, useEffect } from 'react';
import { supabase } from './supaBaseclient';
import AssignTask from './AssignTask'; // Ensure the correct import path and case

const TeacherDashboard = () => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProject, setNewProject] = useState('');

    useEffect(() => {
        // Get current user
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            // Fetch projects
            if (user) {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('teacher_id', user.id);

                if (error) console.error('Error fetching projects:', error);
                else setProjects(data || []);
            }
            setLoading(false);
        };

        getCurrentUser();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    const handleCreateProject = async () => {
        if (!newProject.trim()) return;

        const { data, error } = await supabase
            .from('projects')
            .insert([{
                name: newProject,
                teacher_id: user.id,
                created_at: new Date()
            }])
            .select();

        if (error) {
            console.error('Error creating project:', error);
        } else {
            setProjects([...projects, data[0]]);
            setNewProject('');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Teacher Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user?.user_metadata?.firstName || user?.email}</span>
                    <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="projects-section">
                    <h2>My Projects</h2>
                    <div className="create-project">
                        <input
                            type="text"
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                            placeholder="New Project Name"
                        />
                        <button onClick={handleCreateProject}>Create Project</button>
                    </div>

                    <div className="projects-list">
                        {projects.length === 0 ? (
                            <p>No projects yet. Create your first project!</p>
                        ) : (
                            projects.map(project => (
                                <div key={project.id} className="project-card">
                                    <h3>{project.name}</h3>
                                    <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
                                    <AssignTask projectId={project.id} />
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TeacherDashboard;