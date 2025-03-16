import React, { useState, useEffect } from "react";
import { supabase } from "./supaBaseclient";

const AssignTask = ({ projectId }) => {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch students with student role
    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, first_name, last_name, email')
                .eq('role', 'student');

            if (error) {
                console.error('Error fetching students:', error);
            } else {
                setStudents(data || []);
            }
        };

        fetchStudents();
    }, []);

    const handleAssign = async () => {
        if (!taskName || !dueDate || !selectedStudent) {
            setMessage("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const { error } = await supabase
                .from("tasks")
                .insert([{
                    project_id: projectId,
                    task_name: taskName,
                    due_date: dueDate,
                    assigned_to: selectedStudent,
                    completed: false
                }]);

            if (error) throw error;

            setMessage("Task assigned successfully!");
            setTaskName("");
            setDueDate("");
            setSelectedStudent("");
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="assign-task-container">
            <h3>Assign New Task</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="form-input"
                >
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.first_name ?
                                `${student.first_name} ${student.last_name}` :
                                student.email}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleAssign}
                disabled={isLoading}
                className="submit-button"
            >
                {isLoading ? "Assigning..." : "Assign Task"}
            </button>

            {message && <p className={message.includes("Error") ? "error-message" : "success-message"}>{message}</p>}
        </div>
    );
};

export default AssignTask;