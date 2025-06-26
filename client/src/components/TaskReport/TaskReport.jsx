import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { MdEdit } from "react-icons/md";
import './TaskReport.css'
import Button from '@mui/material/Button';
import TaskForm from '../TaskForm/TaskForm';
import { toast } from 'react-toastify'

function TaskReport({ tasks, setTask }) {
  const [filteredTask, setFilteredTask] = useState(tasks);
  const [open, setOpen] = useState(false)
  const [editTask, setEditTask] = useState([])

  useEffect(() => {
    setFilteredTask(tasks);
  }, [tasks]);

  const handleUpdate = (task) => {
    const updateTask = tasks.map((item, index) => task.id === item.id ? task : item)
    setTask(updateTask)
    toast.success('Task Updated')
  }
  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filteredData = tasks.filter(item =>
      item.title.toLowerCase().startsWith(searchValue)
    );
    setFilteredTask(filteredData);
  };


  return (
    <>
      <TextField
        id="outlined-search"
        label="Search By Task Name"
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Task Name</th>
              <th className="th">Created Date</th>
              <th className="th">Due Date</th>
              <th className="th">Priority</th>
              <th className="th">Status</th>
              <th className="th">Assigned To</th>
              <th className="th">Action</th>

            </tr>
          </thead>
          <tbody>
            {filteredTask.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTask.map((taskItem, index) => (
                <tr key={index}>
                  <td className="td">{taskItem.title}</td>
                  <td className="td">{taskItem.created_at}</td>
                  <td className="td">{taskItem.due_date}</td>
                  <td className="td">{taskItem.priority}</td>
                  <td className="td">{taskItem.status}</td>
                  <td className="td">{taskItem.assigned_to}</td>
                  <td>
                    <button
                      className='editButton'
                      onClick={() => {
                        setOpen(true);
                        setEditTask(taskItem);
                      }}
                    >
                      <MdEdit fontSize={18} />
                      Edit Task
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

        <TaskForm
          open={open}
          onSave={handleUpdate}
          onClose={() => setOpen(false)}
          editTask={editTask}
          isUpdate={true}
        />

      </div>

    </>
  );
}

export default TaskReport