import Grid from '../Grid/Grid'
import { useState, useEffect } from 'react';
import './FourQuadrants.css'
import TaskForm from '../TaskForm/TaskForm';
import Button from '@mui/material/Button';
import { IoAddOutline } from "react-icons/io5";
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify'
const label = { inputProps: { 'aria-label': 'Size switch demo' } };
function FourQuadrants({ tasks, setTask,setHideTable }) {
  const color = ["#2196F3", "#F44336", "#000000", "#FF9800"];
  const [gridData, setGridData] = useState([]);
  const [open, setOpen] = useState(false)
  const [switchChecked, setSwitchChecked] =useState(true);

  const handleTaskSave = (task) => {

    setTask(prev => [...prev, task]);
   
   
    toast.success('Task created')
  }
  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
    console.log("Default Switch:", event.target.checked);
    setHideTable(event.target.checked)
  };
  useEffect(() => {
    const categorizeTasksByPriority = (tasks) => {
      console.log('tasks', tasks)
      const impUrgentGrid = [], impNotUrgentGrid = [], notImpUrgentGrid = [], notImpNotUrgentGrid = [];

      const today = new Date();
      const offsetToday = new Date(today.getTime() + 5.5 * 60 * 60 * 1000);
      const todayDate = offsetToday.toISOString().split("T")[0];

      let weekLastDate = new Date(offsetToday);
      weekLastDate.setDate(weekLastDate.getDate() + 5);
      weekLastDate = weekLastDate.toISOString().split("T")[0];

      for (let single of tasks) {
        if (single.due_date === todayDate && single.priority === "high") {
          impUrgentGrid.push(single);
        } else if (
          single.due_date > todayDate &&
          single.due_date <= weekLastDate &&
          (single.priority === "high" || single.priority === "normal")
        ) {
          impNotUrgentGrid.push(single);
        } else if (single.created_at === todayDate && single.due_date === todayDate) {
          notImpUrgentGrid.push(single);
        } else if (single.due_date < todayDate && single.priority === "high") {
          single.suggestion = "overdueTask";
          impUrgentGrid.push(single);
        } else {
          notImpNotUrgentGrid.push(single);
        }
      }

      const updatedTask = [
        { title: "Important & Not Urgent", list: impNotUrgentGrid },
        { title: "Important & Urgent", list: impUrgentGrid },
        { title: "Not Important & Not Urgent", list: notImpNotUrgentGrid },
        { title: "Not Important & Urgent", list: notImpUrgentGrid }
      ];
      setGridData(updatedTask);
    };
  
    categorizeTasksByPriority(tasks);
  }, [tasks]);

  return (
    <>
      <div>
        <Button variant="contained" style={{fontWeight:"bolder"}} onClick={() => setOpen(true)} >
          <IoAddOutline /> Add Task
        </Button>
        <Switch
        {...label}
        checked={switchChecked}
        onChange={handleSwitchChange}
        size="medium"
      />
      </div>
      
      <div className='gird-content'>
          <p>Aim to focus on Important and Not Urgent tasks to avoid these becoming urgent. This is a key trait of highly productive people</p>
          <p>Reprioritize your tasks by changing due dates or priority to focus on what matters most.</p>
      </div>
      <div className="main-grid">
        {gridData.map((grid, index) => (
          <Grid key={index} title={grid.title} taskList={grid.list} color={color} colorIndex={index} />
        ))}
      </div>

      <TaskForm
        open={open}
        onSave={handleTaskSave}
        onClose={() => setOpen(false)}
        isUpdate={false}
      />

    </>
  );
}

export default FourQuadrants