import Adding from "./Adding";
import "./style.css";
import MyButtons from "./MyButtons.js";


// all that done in the AllTasks.js file will be done in this file but we will only show the completed tasks in this file and will not show the pending tasks in this file and will also show the complete, update and delete buttons for each task and will also show the task in the UI
export default function CompletedTasks() {        
    return (
        <div>
            <h1>Completed Tasks</h1>
            <MyButtons all={false} Complete={true} pending={false} />
            <Adding />
        </div>
)}

