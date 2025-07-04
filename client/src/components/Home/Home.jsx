import { useState, useEffect } from "react";
import FourQuadrants from "../FourQuadrants/FourQuadrants";
import TaskReport from "../TaskReport/TaskReport";
import TaskCount from "../TaskCount/TaskCount";

import './Home.css';

function Home() {
   const [task, setTask] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
 
  const [hideTable,setHideTable]=useState(true)

  useEffect(()=>{
     localStorage.setItem('tasks',JSON.stringify(task))

  },[task])

   

  
  return (
    <div className="main">
      <div className="top-left"><FourQuadrants tasks={task} setTask={setTask} hideTable={hideTable}setHideTable={setHideTable} /></div>
      <div className="top-right"><TaskCount tasks={task} /></div>
      {hideTable&& <div className="bottom-row"><TaskReport tasks={task} setTask={setTask} /></div>} 
    </div>
  );
}

export default Home;
