// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Placeholder for now
import TeacherDashboard from './components/TeacherDashboard'; // Create this component later
import StudentDashboard from './components/StudentDashboard'; // Create this component later

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
