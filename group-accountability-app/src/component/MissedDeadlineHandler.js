import { useState, useEffect } from "react";

const MissedDeadlineHandler = ({ projectId, members, tasks, onMemberKicked }) => {
  const [membersWithMissedDeadlines, setMembersWithMissedDeadlines] = useState([]);
  const [showKickConfirmation, setShowKickConfirmation] = useState(false);
  const [memberToKick, setMemberToKick] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Check for missed deadlines
  useEffect(() => {
    if (!members || !tasks) return;

    const today = new Date();
    const missedDeadlineMembers = [];

    members.forEach(member => {
      const memberTasks = tasks.filter(task => 
        task.assignedTo === member.email && 
        !task.completed && 
        new Date(task.deadline) < today
      );
      
      if (memberTasks.length >= 2) {
        missedDeadlineMembers.push({
          ...member,
          missedTasks: memberTasks,
          missedDeadlines: memberTasks.length
        });
      }
    });

    setMembersWithMissedDeadlines(missedDeadlineMembers);
  }, [members, tasks]);

  // Handle kicking a member
  const handleKickMember = (member) => {
    setMemberToKick(member);
    setShowKickConfirmation(true);
  };

  // Confirm kicking a member
  const confirmKickMember = () => {
    if (memberToKick) {
      // In a real app, you would call an API to remove the member
      onMemberKicked(projectId, memberToKick.id);
      
      // Show error message
      setShowErrorMessage(true);
      
      // Hide confirmation modal
      setShowKickConfirmation(false);
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="missed-deadline-handler">
      {membersWithMissedDeadlines.length > 0 && (
        <div className="missed-deadlines-alert">
          <h3>Members with Missed Deadlines</h3>
          <ul className="missed-deadlines-list">
            {membersWithMissedDeadlines.map(member => (
              <li key={member.id} className="missed-deadline-item">
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-email">{member.email}</span>
                  <span className="missed-count">
                    Missed Deadlines: {member.missedDeadlines}
                  </span>
                </div>
                {member.missedDeadlines >= 2 && (
                  <button 
                    className="kick-member-btn"
                    onClick={() => handleKickMember(member)}
                  >
                    Remove from Project
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kick Confirmation Modal */}
      {showKickConfirmation && memberToKick && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Remove Team Member</h2>
            <p>
              Are you sure you want to remove <strong>{memberToKick.name}</strong> from the project?
              They have missed {memberToKick.missedDeadlines} deadlines.
            </p>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowKickConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmKickMember}
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showErrorMessage && (
        <div className="error-message">
          <div className="error-content">
            <h3>Member Removed</h3>
            <p>
              <strong>{memberToKick.name}</strong> has been removed from the project for missing multiple deadlines.
            </p>
            <button 
              className="close-error-btn"
              onClick={() => setShowErrorMessage(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissedDeadlineHandler;
