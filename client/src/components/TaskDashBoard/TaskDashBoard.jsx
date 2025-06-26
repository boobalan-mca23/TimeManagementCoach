import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './TaskDashBoard.css'

function DashBoard() {
    const [taskData, setTaskData] = useState([]);
    const [deadLine, setDeadLine] = useState([])
    const handleTaskDue = (tasks) => {
        const dueToday = [], duethisweek = [], duenextweek = [];
        const today = new Date();
        const offsetToday = new Date(today.getTime() + 5.5 * 60 * 60 * 1000);
        const todayDate = offsetToday.toISOString().split("T")[0];

        let weekLastDate = new Date(offsetToday);
        weekLastDate.setDate(weekLastDate.getDate() + 5);
        weekLastDate = weekLastDate.toISOString().split("T")[0];

        for (let single of tasks) {

            if ((single.due_date === todayDate && single.priority === "high") || (single.created_at === todayDate && single.due_date === todayDate)||(single.due_date<todayDate && single.priority === "high")) {
                dueToday.push(single);
            } else if (
                single.due_date > todayDate &&
                single.due_date <= weekLastDate &&
                (single.priority === "high" || single.priority === "normal")
            ) {
                duethisweek.push(single);
            }
            else {
                duenextweek.push(single);
            }
        }

        const updatedTask = [
            { title: "dueToday", list: dueToday, },
            { title: "dueThisWeek", list: duethisweek },
            { title: "dueNextWeek", list: duenextweek },

        ];

        setDeadLine(updatedTask);
    }
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:3031/tasks');
            setTaskData(response.data);
            handleTaskDue(response.data)

        };
        fetchTasks();
    }, []);

    const summary = {
        completed: taskData.filter(task => task.status === 'completed').length,
        inprogress: taskData.filter(task => task.status === 'inprogress').length,
        pending: taskData.filter(task => task.status === 'pending').length,
    };

    const chartData = [
        { status: 'Completed', count: summary.completed },
        { status: 'In Progress', count: summary.inprogress },
        { status: 'Pending', count: summary.pending },
    ];

    return (
        <div className="analytics-container">

            <div className="chart-section">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        <div className="deadLineSection">
  {deadLine.length === 3 && (
    <div className="deadline-cards">
      <div className="deadline-card">
        <h4>Due Today</h4>
        {deadLine[0].list.map((item) => (
          <ul key={item._id} className="deadline-item">
            <li><strong>Title:</strong> {item.title}</li>
            <li><strong>Priority:</strong> {item.priority}</li>
            <li><strong>Due:</strong> {item.due_date}</li>
          </ul>
        ))}
      </div>

      <div className="deadline-card">
        <h4>Due This Week</h4>
        {deadLine[1].list.map((item) => (
          <ul key={item._id} className="deadline-item">
            <li><strong>Title:</strong> {item.title}</li>
            <li><strong>Priority:</strong> {item.priority}</li>
            <li><strong>Due:</strong> {item.due_date}</li>
          </ul>
        ))}
      </div>

      <div className="deadline-card">
        <h4>Due Next Week</h4>
        {deadLine[2].list.map((item) => (
          <ul key={item._id} className="deadline-item">
            <li><strong>Title:</strong> {item.title}</li>
            <li><strong>Priority:</strong> {item.priority}</li>
            <li><strong>Due:</strong> {item.due_date}</li>
          </ul>
        ))}
      </div>
    </div>
  )}
</div>


        </div>
    );
}

export default DashBoard;
