"use client"

import { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { Home, Users, CheckSquare, Calendar, Book, Settings, LogOut } from "lucide-react"
import "../styles/StudentLayout.css"

const StudentLayout = () => {
  const [points] = useState(0)

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Student Dashboard</h2>
        </div>

        <nav className="sidebar-nav">
          <Link to="/student" className="nav-item active">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/student/teams" className="nav-item">
            <Users size={20} />
            <span>Teams</span>
          </Link>
          <Link to="/student/tasks" className="nav-item">
            <CheckSquare size={20} />
            <span>Tasks</span>
          </Link>
          <Link to="/student/schedule" className="nav-item">
            <Calendar size={20} />
            <span>Schedule</span>
          </Link>
          <Link to="/student/lessons" className="nav-item">
            <Book size={20} />
            <span>Lessons</span>
          </Link>
          <Link to="/student/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">SD</div>
            <div className="user-info">
              <h4>Student Name</h4>
              <p>Science Class</p>
              <p className="user-role">Student</p>
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
            <Link to="/" className="switch-button">
              Switch to Teacher View
            </Link>
          </div>
          <div className="points-display">Points: {points}</div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default StudentLayout

