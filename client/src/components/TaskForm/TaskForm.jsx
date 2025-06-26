import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './TaskForm.css'
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';

function TaskForm({ open, onSave, onClose, editTask = null, isUpdate = null }) {

    const [newtask, setNewTask] = useState({
        id: "",
        title: "",
        created_at: "",
        due_date: "",
        priority: "",
        status: "",
        assigned_to: "",
    })

    useEffect(() => {
        if (editTask) {
            setNewTask(editTask)
        } else {
            setNewTask({
                id: "",
                title: "",
                created_at: "",
                due_date: "",
                priority: "",
                status: "",
                assigned_to: "",
            })
        }
    }, [editTask])
    const handlechange = (e) => {
        const { name, value } = e.target
        setNewTask((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleSave = (e) => {
        e.preventDefault();

        const taskToAdd = {
            ...newtask,
            id: isUpdate ? editTask.id : uuidv4(),            // ✅ generate unique ID

        };

        // Check all fields are filled
        if (
            taskToAdd.title &&
            taskToAdd.due_date &&
            taskToAdd.created_at &&
            taskToAdd.priority &&
            taskToAdd.status &&
            taskToAdd.assigned_to
        ) {
            onSave(taskToAdd)
            setNewTask({
                id: "",
                title: "",
                created_at: "",
                due_date: "",
                priority: "",
                status: "",
                assigned_to: "",
            })
            onClose(false)
            // Now you can call setTask([...tasks, taskToAdd]) or similar
        }
    }

    return (
        <>
            <Dialog open={open}>
                <form className="dialog-form" onSubmit={handleSave}>
                    <DialogTitle style={{ textAlign: "center", color: 'blue' }}>{isUpdate ? 'Edit Task' : 'Add Task'}</DialogTitle>
                    <DialogContent>
                        <div className="form-row">
                            <label>Task Name</label>
                            <TextField
                               autoFocus
                               required
                                type="text"
                                name="title"
                                variant="outlined"
                                value={newtask.title}
                                onChange={handlechange}
                            />
                        </div>
                        <div className="form-row">
                            <label>Task Create Date</label>
                            <TextField
                                
                                required
                                type="date"
                                name="created_at"
                                variant="outlined"
                                value={newtask.created_at}
                                InputLabelProps={{ shrink: true }}
                                onChange={handlechange}
                            />
                        </div>
                        <div className="form-row">
                            <label>Due Date</label>
                            <TextField
                                
                                required
                                type="date"
                                name="due_date"
                                variant="outlined"
                                value={newtask.due_date}
                                InputLabelProps={{ shrink: true }}
                                onChange={handlechange}
                            />
                        </div>

                        <div className="form-row">
                            <label>Priority</label>
                            <Select
                                
                                name="priority"
                                value={newtask.priority}
                                onChange={handlechange}
                                defaultValue="">
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="normal">Normal</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </div>

                        <div className="form-row">
                            <label>Status</label>
                            <Select name="status"
                              
                                value={newtask.status}
                                defaultValue=""
                                onChange={handlechange}>
                                <MenuItem value="completed">Completed</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="in progress">In Progress</MenuItem>
                            </Select>
                        </div>

                        <div className="form-row">
                            <label>Assigned To</label>
                            <Select
                               
                                name="assigned_to"
                                value={newtask.assigned_to}
                                defaultValue=""
                                onChange={handlechange}>
                                <MenuItem value="user1">User 1</MenuItem>
                                <MenuItem value="user2">User 2</MenuItem>
                                <MenuItem value="user3">User 3</MenuItem>
                            </Select>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type='submit'>{isUpdate ? "Edit" : "Save"}</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}
export default TaskForm
