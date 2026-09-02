import  Adding from "./Adding";
import { useState, useContext } from "react";
import "./style.css";
import UpdatePage from "./updatepage";
import { Link } from "react-router-dom";
import { TaskContext } from "./Context/taskdetails.js";



export default function AllTasks() {

    // we will use context api to pass the state and setState function to the child components so that we can access the state and setState function in the child components without prop drilling
    let context = useContext(TaskContext);
    const taskList = context?.taskList || [];
    const setTaskList = context?.setTaskList || (() => {});
    console.log(taskList);
    
    // this function will handle the complete task functionality and will update the task in the local storage and will also update the state so that the app will be reactive
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

        // make the state and local storage know about the updated task so that the app will be reactive and will show the updated task in the UI
        setTaskList(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        
    }

    // this function will only handle the info to other component
    function handleUpdateTask(id) {
        <UpdatePage id={id} />
    }

    // this function will handle the delete task functionality and will update the task in the local storage and will also update the state so that the app will be reactive
    function handleDeleteTask(id) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const storedTasks = tasks.filter((task) => task.id !== id);
        const updatedTasks = taskList.filter((task) => task.id !== id);
        setTaskList(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(storedTasks)); // will return an array without the task 
    }

    



    // now we will map the taskList array and will return a div for each task and will show the task in the UI and will also show the complete, update and delete buttons for each task
    // we must make sure use the state not the local storage to map the taskList array because the state is reactive and will update the UI when the state is updated but the local storage is not reactive and will not update the UI when the local storage is updated
    let TasksDiv = taskList.map((task) => {
        return(
            // the big div 
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
                {/* the actual task */}
                {/* النص في أقصى اليمين */}
                <p className="taskcontient" style={{ margin: 0, textAlign: 'right', wordBreak: 'break-word' }}>
                {task.task}
                </p>

                {/* الأزرار مع التوسيط الكامل للأيقونات */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexShrink: 0 }}>

                {/* handling the complete, update and delete buttons for each task and will also show the task in the UI */}
                    <button 
                    
                    onClick={() => handleCompleteTask(task.id)}
                    style={{ 
                        backgroundColor: task.completed ? 'green' : 'white', 
                        border: '1px solid #2e6c08', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        cursor: 'pointer', 
                        color: task.completed ? 'white' : 'green',
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
    });
    return (
        <div>
            <h1>All Tasks</h1>
            {TasksDiv} 
            <Adding />
        </div>
)};
    