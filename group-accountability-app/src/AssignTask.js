import { useState } from "react";
import supabase from "./supabaseClient";

const AssignTask = ({ projectId }) => {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleAssign = async () => {
        const { error } = await supabase
            .from("tasks")
            .insert([{ project_id: projectId, task_name: taskName, due_date: dueDate }]);

        if (error) alert(error.message);
        else alert("Task Assigned!");
    };

    return (
        <div>
            <h2>Assign Task</h2>
            <input type="text" placeholder="Task Name" onChange={(e) => setTaskName(e.target.value)} />
            <input type="date" onChange={(e) => setDueDate(e.target.value)} />
            <button onClick={handleAssign}>Assign</button>
        </div>
    );
};

export default AssignTask;