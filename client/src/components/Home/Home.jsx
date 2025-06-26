import { useState, useEffect } from "react";
import FourQuadrants from "../FourQuadrants/FourQuadrants";
import TaskReport from "../TaskReport/TaskReport";
import TaskCount from "../TaskCount/TaskCount";

import './Home.css';

function Home() {
  const [task, setTask] = useState([]);



  return (
    <div className="main">
      <div className="top-left"><FourQuadrants tasks={task} setTask={setTask} /></div>
      <div className="top-right"><TaskCount tasks={task} /></div>
      <div className="bottom-row"><TaskReport tasks={task} setTask={setTask} /></div>
    </div>
  );
}

export default Home;
