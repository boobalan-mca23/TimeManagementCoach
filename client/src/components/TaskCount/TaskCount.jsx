import { useState,useEffect } from 'react';
import './TaskCount.css'
function TaskCount({ tasks }) {
  const [taskCount, setTaskCount] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inprogress: 0
  });

  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === "completed").length;
    const inprogress = tasks.filter(task => task.status === "in progress").length;
    const pending = tasks.filter(task => task.status === "pending").length;
    setTaskCount({ total, completed, pending, inprogress });
  }, [tasks]);

  return (
    <div className="task-count-container">
      <div className="task-box total">Total Tasks: {taskCount.total}</div>
      <div className="task-box completed">Completed: {taskCount.completed}</div>
      <div className="task-box inprogress">In Progress: {taskCount.inprogress}</div>
      <div className="task-box pending">Pending: {taskCount.pending}</div>
    </div>
  );
}

export default TaskCount