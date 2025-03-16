import { useState } from "react";
import supabase from "./supaBaseclient";

const AssignTask = ({ projectId }) => {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    const handleAssign = async () => {
        if (!taskName || !dueDate) {
            setError("Task name and due date are required.");
            return;
        }

        const { error } = await supabase
            .from("tasks")
            .insert([{ project_id: projectId, task_name: taskName, due_date: dueDate }]);

        if (error) {
            setError(error.message);
        } else {
            alert("Task Assigned!");
            setTaskName("");
            setDueDate("");
            setError("");
        }
    };

    return (
        <div>
            <h2>Assign Task</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={handleAssign}>Assign</button>
        </div>
    );
};

export default AssignTask;