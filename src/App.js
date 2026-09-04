import logo from './logo.svg';
import './App.css';
import "./style.css"
import { Routes, Route, Link } from "react-router-dom";
import AllTasks from './AllTasks';
import CompletedTasks from './CompletedTasks';
import PendingTasks from './PendingTasks';
import Adding from './Adding';
import { useState } from 'react';
import { TaskContext } from './Context/taskdetails';
import UpdatePage from './updatepage';



function App() {

  // first will make an two array for state management and then will check if there is any data in local storage if yes then will set that data to state otherwise will set empty array to state
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // this more important to make the app reactive and to make the app reactive we will use useState hook and will set the state to the tasks array
  let [taskList, setTaskList] = useState(tasks);
  return (

    // we will use context api to pass the state and setState function to the child components so that we can access the state and setState function in the child components without prop drilling
    <TaskContext.Provider value={{ taskList, setTaskList }}>
    <div className="App" style={{ maxHeight: '90vh', overflowY: 'scroll'}}>
      <h1>My Task List</h1>
      <hr />
      <div style={{ display: 'flex', direction: 'row', gap: '10px', marginTop: '20px', width: '100%',textAlign: 'center', justifyContent: 'center' }}>
        <Link to="/All">
        <button>All</button>
        </Link>
        <Link to="/Completed">
        <button>Completed</button>
        </Link>

        <Link to="/Pending">
        <button>Pending</button>
        </Link>
      

      </div>

    
    <Routes>
      <Route path="/" element={<AllTasks />} />
      <Route path="/All" element={<AllTasks />} />
      <Route path="/Completed" element={<CompletedTasks />} />
      <Route path="/Pending" element={<PendingTasks />} />
      <Route path="/update/:id" element={<UpdatePage />} />
      <Route path="*" element={<AllTasks />} />
    </Routes>

    </div>
    </TaskContext.Provider>
  );
}

export default App;
