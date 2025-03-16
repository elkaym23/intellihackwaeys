"use client"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, Users, CheckSquare } from "lucide-react"
import "../../styles/TeachProjectDetails.css"

const TeachProjectDetailsPage = () => {
  const { folderName, projectName } = useParams()

  // This would normally come from an API or database
  const projectDetails = {
    name: projectName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description:
      "This project aims to explore and understand key concepts through hands-on experimentation and research.",
    deadline: "2023-04-15",
    status: "In Progress",
    tasks: [
      { id: 1, name: "Research Phase", completed: true, dueDate: "2023-03-25" },
      { id: 2, name: "Data Collection", completed: true, dueDate: "2023-04-01" },
      { id: 3, name: "Analysis", completed: false, dueDate: "2023-04-10" },
      { id: 4, name: "Final Report", completed: false, dueDate: "2023-04-15" },
    ],
    team: [
      { id: 1, name: "John Doe", role: "Team Lead" },
      { id: 2, name: "Jane Smith", role: "Researcher" },
      { id: 3, name: "Alex Johnson", role: "Data Analyst" },
      { id: 4, name: "Sam Wilson", role: "Writer" },
    ],
  }

  return (
    <div className="project-details-container">
      <div className="back-link">
        <Link to={`/projects/${folderName}`}>
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="project-header">
        <h1>{projectDetails.name}</h1>
        <div className="project-meta">
          <span className={`status-badge ${projectDetails.status.toLowerCase().replace(/\s+/g, "-")}`}>
            {projectDetails.status}
          </span>
          <span className="deadline">
            <Calendar size={16} />
            Due: {new Date(projectDetails.deadline).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="project-description">
        <h2>Description</h2>
        <p>{projectDetails.description}</p>
      </div>

      <div className="project-content">
        <div className="tasks-section">
          <div className="section-header">
            <CheckSquare size={20} />
            <h2>Tasks</h2>
          </div>
          <div className="tasks-list">
            {projectDetails.tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-checkbox">
                  <input type="checkbox" checked={task.completed} readOnly />
                </div>
                <div className="task-details">
                  <h3>{task.name}</h3>
                  <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <div className={`task-status ${task.completed ? "completed" : "pending"}`}>
                  {task.completed ? "Completed" : "Pending"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <div className="section-header">
            <Users size={20} />
            <h2>Team Members</h2>
          </div>
          <div className="team-list">
            {projectDetails.team.map((member) => (
              <div key={member.id} className="team-member">
                <div className="member-avatar">{member.name.charAt(0)}</div>
                <div className="member-details">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeachProjectDetailsPage

