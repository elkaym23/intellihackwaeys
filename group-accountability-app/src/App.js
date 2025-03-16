import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import TeacherDashboard from './teacherdashboad';
import StudentDashboard from './studentdashboard';
import SelectRole from './SelectRoles';
import { supabase } from './supaBaseclient';
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      // Set up auth listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );

      return () => subscription.unsubscribe();
    };

    checkSession();
  }, []);

  // ProtectedRoute component
  const ProtectedRoute = ({ children, requiredRole = null }) => {
    if (loading) return <div>Loading...</div>;

    if (!session) {
      return <Navigate to="/" />;
    }

    if (requiredRole) {
      // Check if user has required role
      const userRole = session.user?.user_metadata?.role;
      if (userRole !== requiredRole) {
        return <Navigate to="/" />;
      }
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={session ? <Navigate to="/select-role" /> : <Login />} />

          <Route path="/select-role" element={
            <ProtectedRoute>
              <SelectRole />
            </ProtectedRoute>
          } />

          <Route path="/teacher-dashboard" element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } />

          <Route path="/student-dashboard" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;