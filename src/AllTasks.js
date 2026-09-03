import  Adding from "./Adding";
import "./style.css";
import MyButtons from "./MyButtons.js";



export default function AllTasks() {

    return (
        <div>
            <h1>All Tasks</h1>
            <MyButtons all={true} complete={false} pending={false} />
            <Adding />
        </div>
    )
}