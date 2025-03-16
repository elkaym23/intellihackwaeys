"use client"

import { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { Home, Users, CheckSquare, Calendar, Book, Settings, LogOut } from "lucide-react"
import "../styles/TeacherLayout.css"

const TeacherLayout = () => {
  const [points] = useState(0)

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Teacher Dashboard</h2>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-item active">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/teams" className="nav-item">
            <Users size={20} />
            <span>Teams</span>
          </Link>
          <Link to="/tasks" className="nav-item">
            <CheckSquare size={20} />
            <span>Tasks</span>
          </Link>
          <Link to="/schedule" className="nav-item">
            <Calendar size={20} />
            <span>Schedule</span>
          </Link>
          <Link to="/lessons" className="nav-item">
            <Book size={20} />
            <span>Lessons</span>
          </Link>
          <Link to="/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">TD</div>
            <div className="user-info">
              <h4>Teacher Name</h4>
              <p>Science Department</p>
              <p className="user-role">Teacher</p>
            </div>
          </div>
          <div className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="view-switch">
            <Link to="/student" className="switch-button">
              Switch to Student View
            </Link>
          </div>
          <div className="points-display">Points: {points}</div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default TeacherLayout

