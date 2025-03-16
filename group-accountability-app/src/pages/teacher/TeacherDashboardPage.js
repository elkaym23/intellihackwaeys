import { Link } from "react-router-dom"
import { Users, ArrowLeft } from "lucide-react"
import "../../styles/TeacherDashboard.css"

const TeacherDashboardPage = () => {
  const teams = [
    {
      id: 1,
      name: "Team 1",
      members: 5,
      project: "Solar System Research Project",
      folderName: "science",
    },
    {
      id: 2,
      name: "Team 2",
      members: 4,
      project: "Photosynthesis Study",
      folderName: "biology",
    },
    {
      id: 3,
      name: "Team 3",
      members: 6,
      project: "Gravity Experiment",
      folderName: "physics",
    },
    {
      id: 4,
      name: "Team 4",
      members: 3,
      project: "DNA Analysis",
      folderName: "biology",
    },
  ]

  return (
    <div className="dashboard-container">
      <h1>Teacher Dashboard</h1>
      <p className="dashboard-subtitle">Manage your classroom projects and student teams</p>

      <div className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Folders</span>
      </div>

      <div className="teams-grid">
        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-header">
              <div className="team-icon">
                <Users size={20} />
              </div>
              <div className="team-title">
                <h3>{team.name}</h3>
                <p>{team.members} Members</p>
              </div>
            </div>
            <div className="team-content">
              <p>Project: {team.project}</p>
              <Link
                to={`/project/${team.folderName}/${team.project.replace(/\s+/g, "-").toLowerCase()}`}
                className="view-details"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeacherDashboardPage

