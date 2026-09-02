import Adding from "./Adding";
import { TaskContext } from "./Context/taskdetails";
import { useState, useContext } from "react";
import "./style.css";
import UpdatePage from "./updatepage";
import { Link } from "react-router-dom";


// all that done in the AllTasks.js file will be done in this file but we will only show the completed tasks in this file and will not show the pending tasks in this file and will also show the complete, update and delete buttons for each task and will also show the task in the UI
export default function CompletedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        let context = useContext(TaskContext);
        const taskList = context?.taskList || [];
        const setTaskList = context?.setTaskList || (() => {});
        console.log(taskList);
        
        function handleCompleteTask(id) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = taskList.map((task) => {
                if (task.id === id) {
                    if (task.completed === true) {
                        console.log("Task is already completed!");          
                    } else {
                        task.completed = true;
                        console.log("Task marked as completed!");
                    }
                }
                return task;
            });
            setTaskList(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            
        }
    
        function handleUpdateTask(id) {
            <UpdatePage id={id} />
        }
    
        function handleDeleteTask(id) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const storedTasks = tasks.filter((task) => task.id !== id);
            const updatedTasks = taskList.filter((task) => task.id !== id);
            setTaskList(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(storedTasks)); // will return an array without the task 
        }




    let completedTasks = taskList.map((task) => {
        if (task.completed === true) {
            return (
                <div 
                key={task.id} 
                style={{ 
                    margin: '20px auto', 
                    backgroundColor: 'lightblue', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '10px 20px',
                    width: '40%',
                    boxSizing: 'border-box'
                }}

                className="task-item"
            >
                {/* النص في أقصى اليمين */}
                <p style={{ margin: 0, textAlign: 'right', wordBreak: 'break-word' }}>
                    {task.task}
                </p>

                {/* الأزرار مع التوسيط الكامل للأيقونات */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexShrink: 0 }}>
                    <button 
                    onClick={() => handleCompleteTask(task.id)}

                    style={{ 
                        backgroundColor: 'green', 
                        border: '1px solid #2e6c08', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        cursor: 'pointer', 
                        color: 'white',
                        display: 'flex',            // لتوسيط المحتوى
                        justifyContent: 'center',   // توسيط أفقي
                        alignItems: 'center'        // توسيط عمودي
                    }}>
                        ✓
                    </button>
                    <Link to={`/update/${task.id}`} style={{ textDecoration: 'none' }}>
                    <button 
                    
                    style={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #130385', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        cursor: 'pointer', 
                        color: 'blue',
                        display: 'flex',            // لتوسيط المحتوى
                        justifyContent: 'center',   // توسيط أفقي
                        alignItems: 'center'        // توسيط عمودي
                    }}>
                        ✎
                    </button>
                    </Link>
                    
                    <button 
                    onClick={() => handleDeleteTask(task.id)}
                    style={{ 
                        backgroundColor: 'lightcoral', 
                        border: '1px solid #bb1a05', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        cursor: 'pointer', 
                        color: 'white',
                        display: 'flex',            // لتوسيط المحتوى
                        justifyContent: 'center',   // توسيط أفقي
                        alignItems: 'center'        // توسيط عمودي
                    }}>
                        🗄
                    </button>
                </div>
            </div>
            )
        }
    })
                
    return (
        <div>
            <h1>Completed Tasks</h1>
            {completedTasks}
            <Adding />
        </div>
)}

