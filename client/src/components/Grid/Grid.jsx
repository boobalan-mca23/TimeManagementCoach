import React from "react";
import { FaFire, FaRegClock, FaPauseCircle, FaExclamationTriangle } from "react-icons/fa";
import './Grid.css'
function Grid({ title, taskList, color, colorIndex }) {
  return (
    <div>
      <div>
        <h4 style={{
          marginBottom: "10px",
          fontSize: "1.2rem",
          color: color[colorIndex],
          borderBottom: "2px solid #f0f0f0",
          paddingBottom: "5px"
        }}>
           {title === "Important & Not Urgent" && <FaRegClock />}
           {title === "Important & Urgent" && <FaFire />}
           {title === "Not Important & Not Urgent" && <FaPauseCircle />}
           {title === "Not Important & Urgent" && <FaExclamationTriangle />}
           <span style={{marginLeft:"5px"}}>{title}</span> </h4>

      </div>

      <div className="grid-container"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}>

        <ul >
          {taskList.length === 0 ? (
            <p className="notask">No tasks in this category.</p>
          ) : (
            taskList.map((task, index) => (
              <li key={index} style={{
               
              }}><span style={{ fontSize: "18px" }}>
                {index + 1}.{task.title} 
                <strong> Due Date </strong>:{task.due_date}
                <strong style={{color:"red"}}> {task?.suggestion}</strong>
              </span>
                <span style={{

                  padding: "3px 8px",
                  background: task.priority === "high" ? "#e57373" : task.priority === "normal" ? "#fff176" : "#81C784",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  width: "60px",
                  textAlign: "center",
                  display: "inline-block"

                }}>
                  {task.priority}
                </span></li>
            ))
          )}

        </ul>
      </div>
    </div>

  );
}

export default Grid;
