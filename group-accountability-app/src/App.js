import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from './Login';
import TeacherDashboard from './teacherdashboard';
import StudentDashboard from './studentdashboard';
import SelectRole from './SelectRoles';
import { supabase } from './supaBaseclient';
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log("App mounted - checking session");

    // Check for active session
    const checkSession = async () => {
      try {
        // First set loading to true
        setLoading(true);

        // Get session from supabase
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session check result:", session ? "Session exists" : "No session");

        // Set session state
        setSession(session);

        // Set up auth listener
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", session ? "Has session" : "No session");
            setSession(session);
          }
        );

        // Mark initialization as complete
        setInitialized(true);
        setLoading(false);

        return () => {
          console.log("Unsubscribing from auth state changes");
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking session:", error);
        setInitialized(true); // Even on error, mark as initialized
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Don't render anything until we've checked for a session
  if (!initialized) {
    return <div className="loading-container">Initializing application...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - should show Login if not authenticated */}
          <Route
            path="/"
            element={
              loading ? (
                <div className="loading-container">Loading...</div>
              ) : session ? (
                session.user?.user_metadata?.role ? (
                  <Navigate to={`/${session.user.user_metadata.role}-dashboard`} replace />
                ) : (
                  <Navigate to="/select-role" replace />
                )
              ) : (
                <Login />
              )
            }
          />

          {/* Protected routes that require authentication */}
          <Route
            path="/select-role"
            element={
              <AuthRequiredRoute session={session} loading={loading}>
                <SelectRole />
              </AuthRequiredRoute>
            }
          />

          <Route
            path="/teacher-dashboard"
            element={
              <RoleRequiredRoute session={session} loading={loading} requiredRole="teacher">
                <TeacherDashboard />
              </RoleRequiredRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <RoleRequiredRoute session={session} loading={loading} requiredRole="student">
                <StudentDashboard />
              </RoleRequiredRoute>
            }
          />

          {/* Special route to handle logout */}
          <Route
            path="/logout"
            element={<LogoutHandler />}
          />

          {/* Catch-all route to redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Component to protect routes that require authentication
function AuthRequiredRoute({ children, session, loading }) {
  if (loading) return <div className="loading-container">Loading authentication...</div>;

  if (!session) {
    console.log("No session - redirecting to login");
    return <Navigate to="/" replace />;
  }

  return children;
}

// Component to protect routes that require a specific role
function RoleRequiredRoute({ children, session, loading, requiredRole }) {
  if (loading) return <div className="loading-container">Loading authentication...</div>;

  if (!session) {
    console.log("No session - redirecting to login");
    return <Navigate to="/" replace />;
  }

  const userRole = session.user?.user_metadata?.role;
  console.log("User role:", userRole, "Required role:", requiredRole);

  if (userRole !== requiredRole) {
    // If user has no role, redirect to role selection
    if (!userRole) {
      console.log("No role - redirecting to role selection");
      return <Navigate to="/select-role" replace />;
    }
    // If user has wrong role, redirect to their dashboard
    console.log("Wrong role - redirecting to appropriate dashboard");
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return children;
}

// Component to handle logout
function LogoutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      console.log("Logging out...");
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error during sign out:", error);
        } else {
          console.log("Sign out successful");
        }
      } catch (e) {
        console.error("Exception during sign out:", e);
      }

      // Wait a moment before navigating to ensure logout is processed
      setTimeout(() => {
        console.log("Redirecting to login after logout");
        navigate('/', { replace: true });
      }, 100);
    };

    performLogout();
  }, [navigate]);

  return <div className="loading-container">Logging out...</div>;
}

export default App;