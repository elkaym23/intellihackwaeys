"use client"
import { useParams, Link } from "react-router-dom"
import { Folder, Plus } from "lucide-react"
import "../../styles/TeachProjects.css"

const TeachProjectsPage = () => {
  const { folderName } = useParams()

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "Solar System Research",
      folder: "science",
      deadline: "2023-04-15",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Photosynthesis Study",
      folder: "biology",
      deadline: "2023-04-20",
      status: "Not Started",
    },
    {
      id: 3,
      name: "Gravity Experiment",
      folder: "physics",
      deadline: "2023-04-10",
      status: "Completed",
    },
    {
      id: 4,
      name: "DNA Analysis",
      folder: "biology",
      deadline: "2023-04-25",
      status: "In Progress",
    },
  ]

  // Filter projects by folder
  const folderProjects = projects.filter((project) => project.folder === folderName)

  return (
    <div className="projects-container">
      <h1>{folderName.charAt(0).toUpperCase() + folderName.slice(1)} Projects</h1>
      <p className="projects-subtitle">Manage and track projects in this folder</p>

      <div className="projects-grid">
        {/* Top row - Project categories and Create New */}
        <div className="projects-categories">
          <div className="category-card">
            <Folder size={24} />
            <h3>Active Projects</h3>
            <p>3 Projects</p>
          </div>
          <div className="category-card">
            <Folder size={24} />
            <h3>Completed</h3>
            <p>1 Project</p>
          </div>
          <div className="category-card">
            <Folder size={24} />
            <h3>Upcoming</h3>
            <p>2 Projects</p>
          </div>
          <div className="category-card new-folder">
            <Plus size={24} />
            <h3>Create New</h3>
            <p>Add a project</p>
          </div>
        </div>

        {/* Bottom row - Current projects */}
        <h2 className="section-title">Current Projects</h2>
        <div className="current-projects">
          {folderProjects.length > 0 ? (
            folderProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className={`status-indicator ${project.status.toLowerCase().replace(/\s+/g, "-")}`}></div>
                <h3>{project.name}</h3>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                <p className="project-status">Status: {project.status}</p>
                <Link
                  to={`/project/${folderName}/${project.name.replace(/\s+/g, "-").toLowerCase()}`}
                  className="view-details"
                >
                  View Details →
                </Link>
              </div>
            ))
          ) : (
            <p className="no-projects">No projects found in this folder.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeachProjectsPage

