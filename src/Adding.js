import { useState } from "react";
import "./style.css"
import { TaskContext } from "./Context/taskdetails";
import { useContext } from "react";

// this the logic for adding the task to the local storage and will also update the state so that the app will be reactive and will show the updated task in the UI
export default function Adding() {
    // we will use context api to pass the state and setState function to the child components so that we can access the state and setState function in the child components without prop drilling
    let [task, setTask] = useState(""); // this state will hold the value of the input field and will be used to add the task to the local storage and will also update the state so that the app will be reactive and will show the updated task in the UI
    let { taskList, setTaskList } = useContext(TaskContext);

    


    function handleAddTask(e) {
        // chect if the task is not empty and then will add the task to the local storage and will also update the state so that the app will be reactive and will show the updated task in the UI
        if (task.trim() !== "") {
            // Add the task
            let id = Date.now().toString(); // Generate a unique ID based on the current timestamp
            let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let newTaskList = { id: id, task: task, completed: false };
            storedTasks.push(newTaskList);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
            setTaskList([...(taskList || []), newTaskList]); // Update the task list in context the state but but not directly using a copy
            setTask(""); // Clear the input field
        }
    }
    console.log(taskList);
    return (
        
        <div className="adding-container" style={{ display: 'flex', direction: 'row', gap: '10px', marginTop: '20px', width: '100%',textAlign: 'center', justifyContent: 'center' }}>
            <button onClick={() => handleAddTask()} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }} >Add Task</button>
            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '25%' }} />
        </div>
)};