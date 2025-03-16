"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Users, CheckSquare, Folder } from "lucide-react"
import "../../styles/StudentDashboard.css"

const StudentDashboardPage = () => {
  const [classCode, setClassCode] = useState("")
  const [joinedClasses, setJoinedClasses] = useState([])
  const [projects, setProjects] = useState([])
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  })
  const [showAddMembersModal, setShowAddMembersModal] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [memberEmail, setMemberEmail] = useState("")
  const [projectMembers, setProjectMembers] = useState([])
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
  })

  // Sample class data (would come from API in real app)
  const availableClasses = [
    { id: 1, name: "Science Class", folderName: "science", code: "SCI1234" },
    { id: 2, name: "Biology Class", folderName: "biology", code: "BIO5678" },
    { id: 3, name: "History Class", folderName: "history", code: "HIS9012" },
  ]

  const handleJoinClass = (e) => {
    e.preventDefault()
    if (!classCode) {
      alert("Please enter a class code")
      return
    }

    const classToJoin = availableClasses.find((c) => c.code === classCode)
    if (!classToJoin) {
      alert("Invalid class code. Please try again.")
      return
    }

    if (joinedClasses.some((c) => c.id === classToJoin.id)) {
      alert("You've already joined this class.")
      return
    }

    setJoinedClasses([...joinedClasses, classToJoin])
    setClassCode("")
  }

  // Create a new project
  const handleCreateProject = (e) => {
    e.preventDefault()
    if (!newProject.name || !newProject.description || !selectedClass) {
      alert("Please fill in all fields")
      return
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      classId: selectedClass.id,
      className: selectedClass.name,
      members: [],
      tasks: [],
      createdAt: new Date().toISOString(),
    }

    setProjects([...projects, project])
    setCurrentProject(project)
    setNewProject({ name: "", description: "" })
    setShowCreateProjectModal(false)
    setShowAddMembersModal(true)
  }

  // Add member to project
  const handleAddMember = (e) => {
    e.preventDefault()
    if (!memberEmail) {
      alert("Please enter an email address")
      return
    }

    const newMember = {
      id: projectMembers.length + 1,
      email: memberEmail,
      name: memberEmail.split("@")[0], // Simple name extraction
      missedDeadlines: 0,
    }

    setProjectMembers([...projectMembers, newMember])
    setMemberEmail("")
  }

  // Finish adding members
  const handleFinishAddingMembers = () => {
    const updatedProjects = projects.map((p) => {
      if (p.id === currentProject.id) {
        return { ...p, members: projectMembers }
      }
      return p
    })

    setProjects(updatedProjects)
    setShowAddMembersModal(false)
    setShowTaskModal(true)
  }

  // Add task to project
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.title || !newTask.deadline || !newTask.assignedTo) {
      alert("Please fill in all required fields")
      return
    }

    const task = {
      id: currentProject.tasks ? currentProject.tasks.length + 1 : 1,
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      assignedTo: newTask.assignedTo,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    const updatedProjects = projects.map((p) => {
      if (p.id === currentProject.id) {
        const updatedTasks = p.tasks ? [...p.tasks, task] : [task]
        return { ...p, tasks: updatedTasks }
      }
      return p
    })

    setProjects(updatedProjects)
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      assignedTo: "",
    })
  }

  // Finish project setup
  const handleFinishProjectSetup = () => {
    setShowTaskModal(false)
    setProjectMembers([])
    setCurrentProject(null)
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
            onChange={(e) => setClassCode(e.target.value.toUpperCase())}
            className="class-code-input"
          />
          <button type="submit" className="join-class-button">
            Join Class
          </button>
        </form>
      </div>

      {/* Joined Classes Section */}
      {joinedClasses.length > 0 && (
        <div className="dashboard-section joined-classes-section">
          <div className="section-header">
            <h2>My Classes</h2>
            {joinedClasses.length > 0 && (
              <button
                className="create-project-button"
                onClick={() => {
                  setSelectedClass(joinedClasses[0])
                  setShowCreateProjectModal(true)
                }}
              >
                <Plus size={16} />
                Create Project
              </button>
            )}
          </div>
          <div className="classes-grid">
            {joinedClasses.map((cls) => (
              <div className="class-card" key={cls.id}>
                <div className="class-card-header">
                  <Folder size={24} />
                  <h3>{cls.name}</h3>
                </div>
                <div className="class-card-details">
                  <p>
                    <strong>Folder:</strong> {cls.folderName}
                  </p>
                </div>
                <div className="class-card-actions">
                  <button
                    className="create-project-button"
                    onClick={() => {
                      setSelectedClass(cls)
                      setShowCreateProjectModal(true)
                    }}
                  >
                    <Plus size={16} />
                    Create Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-section my-projects-section">
        <h2>My Projects</h2>
        {projects.length === 0 ? (
          <div className="no-projects-message">
            <p>You don't have any projects yet. Create a new project or join a class.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span className="project-class">
                    <Folder size={16} />
                    {project.className}
                  </span>
                  <span className="project-members">
                    <Users size={16} />
                    {project.members ? project.members.length : 0} members
                  </span>
                  <span className="project-tasks">
                    <CheckSquare size={16} />
                    {project.tasks ? project.tasks.length : 0} tasks
                  </span>
                </div>
                <Link to={`/student/project/${project.id}`} className="view-project-button">
                  View Project
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label>Class:</label>
                <select
                  value={selectedClass ? selectedClass.id : ""}
                  onChange={(e) => {
                    const classId = Number.parseInt(e.target.value)
                    const cls = joinedClasses.find((c) => c.id === classId)
                    setSelectedClass(cls)
                  }}
                  required
                >
                  {joinedClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Project Name:</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. Research Paper"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project"
                  rows={3}
                  required
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowCreateProjectModal(false)
                    setNewProject({ name: "", description: "" })
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="create-button">
                  Create & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Members Modal */}
      {showAddMembersModal && currentProject && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Team Members</h2>
            <form onSubmit={handleAddMember} className="modal-form">
              <div className="form-group">
                <label>Member Email:</label>
                <div className="input-with-button">
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </div>

              {projectMembers.length > 0 && (
                <div className="members-list">
                  <h3>Team Members:</h3>
                  <ul>
                    {projectMembers.map((member) => (
                      <li key={member.id}>
                        {member.email}
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => {
                            setProjectMembers(projectMembers.filter((m) => m.id !== member.id))
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="continue-button" onClick={handleFinishAddingMembers}>
                  {projectMembers.length > 0 ? "Continue" : "Skip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Tasks Modal */}
      {showTaskModal && currentProject && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Tasks & Deadlines</h2>
            <form onSubmit={handleAddTask} className="modal-form">
              <div className="form-group">
                <label>Task Title:</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Research Phase"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe the task"
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Deadline:</label>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Assign To:</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                >
                  <option value="">Select team member</option>
                  {projectMembers.map((member) => (
                    <option key={member.id} value={member.email}>
                      {member.email}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="add-task-button">
                Add Task
              </button>

              {currentProject.tasks && currentProject.tasks.length > 0 && (
                <div className="tasks-list">
                  <h3>Tasks:</h3>
                  <ul>
                    {currentProject.tasks.map((task) => (
                      <li key={task.id}>
                        <strong>{task.title}</strong>
                        <div className="task-details">
                          <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                          <span>Assigned to: {task.assignedTo}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="finish-button" onClick={handleFinishProjectSetup}>
                  Finish Project Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboardPage

