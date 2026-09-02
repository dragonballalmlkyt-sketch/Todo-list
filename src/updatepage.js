import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { TaskContext } from "./Context/taskdetails";
import { useContext } from "react";

// this is the update page where we will update the task and will also update the state so that the app will be reactive and will show the updated task in the UI
export default function UpdatePage({id}) {
    // we will use context api to pass the state and setState function to the child components so that we can access the state and setState function in the child components without prop drilling
    let context = useContext(TaskContext);
    const taskList = context?.taskList || [];
    const setTaskList = context?.setTaskList || (() => {});

    // we will use useNavigate hook to navigate to the previous page after updating the task and will also use useParams hook to get the id of the task from the url and will also use useState hook to set the value of the input field to the task that we want to update and will also update the state so that the app will be reactive and will show the updated task in the UI
    let navigate = useNavigate();
    let { id: taskId } = useParams();
    let [updatedTask, setUpdatedTask] = useState(() => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // find the task with the given id in the tasks array and will return the task if found otherwise will return an empty string
        let taskToUpdate = tasks.find(task => task.id === taskId); // becouse it is a string 
        return taskToUpdate ? taskToUpdate.task : "";
    });

    // this function will handle the update task functionality and will update the task in the local storage and will also update the state so that the app will be reactive and will show the updated task in the UI
    function handleUpdateTask() {
        // check if the updated task is not empty and then will update the task in the local storage and will also update the state so that the app will be reactive and will show the updated task in the UI
        if (updatedTask.trim() !== "") {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = tasks.map((task) => {
                // if the task id matches the taskId from the url then will update the task otherwise will return the task as it is
                if (task.id === taskId) {
                    task.task = updatedTask;
                }
                return task;
            });
            // update the local storage and the state so that the app will be reactive and will show the updated task in the UI
            localStorage.setItem(`tasks`, JSON.stringify(updatedTasks));
            setTaskList(updatedTasks);
        }
        
        navigate(-1); // Go back to the previous page
    }
                

    


    return (
        /* 1. الحاوية الخارجية (Overlay): تغطي كامل الشاشة وتظلل ما خلفها */
        <div 

        onClick={(e) => {
            // إذا تم النقر على الحاوية الخارجية (وليس على المربع الداخلي)، أغلق النافذة المنبثقة
            if (e.target === e.currentTarget) {
                navigate(-1); // العودة إلى الصفحة السابقة
            }
        }}
        
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // خلفية رمادية/سوداء شفافة
            backdropFilter: 'blur(5px)',           // يجعل ما خلفها شبه غائم وغير مرئي بوضوح
            display: 'flex',
            justifyContent: 'center',              // توسيط أفقي
            alignItems: 'center',                  // توسيط عمودي
            zIndex: 1000                           // يضمن ظهوره فوق كل عناصر الصفحة
        }}>
            
            {/* 2. المربع الداخلي: النافذة المنبثقة بحجم متوسط في المنتصف */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '30px',
                borderRadius: '8px',
                width: '400px',                     // حجم متوسط مناسب للتعديل
                maxWidth: '90%',                    // ليتناسب مع الشاشات الصغيرة
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
            }}>
                <h2 style={{ marginTop: 0, color: '#333' }}>Update Task</h2>
                <input 
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
                    type="text" 
                    placeholder="Enter new task" 
                    style={{ 
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px',
                        width: '100%',
                        boxSizing: 'border-box',
                        marginTop: '10px'
                    }} 
                />

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>

                    <Link to="#" onClick={(e) => {e.preventDefault(); navigate(-1)}} style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f0f0f0' }}>Cancel</button>
                    </Link>


                    <button onClick={handleUpdateTask} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff' }}>Update</button>
                </div>
            </div>
        </div>
    );
}