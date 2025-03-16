"use client"

import { useState } from "react"
import "../../styles/StudentDashboard.css"

const StudentDashboardPage = () => {
  const [classCode, setClassCode] = useState("")

  const handleJoinClass = (e) => {
    e.preventDefault()
    // Logic to join class would go here
    console.log("Joining class with code:", classCode)
    // Reset the input
    setClassCode("")
  }

  return (
    <div className="student-dashboard-container">
      <h1>Student Dashboard</h1>
      <p className="dashboard-subtitle">View and submit your class projects</p>

      <div className="dashboard-section join-class-section">
        <h2>Join a Class</h2>
        <form onSubmit={handleJoinClass} className="join-class-form">
          <input
            type="text"
            placeholder="Enter class code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            className="class-code-input"
          />
          <button type="submit" className="join-class-button">
            Join Class
          </button>
        </form>
      </div>

      <div className="dashboard-section my-projects-section">
        <h2>My Projects</h2>
        <div className="no-projects-message">
          <p>You don't have any projects yet. Create a new project or join a class.</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboardPage

