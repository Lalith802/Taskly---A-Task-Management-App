import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/VitalTask.css";
import logo from "../assets/taskly-logo.png";
import menuIcon from "../assets/menu-icon.png";
import vitalIcon from "../assets/vital-icon.png";
import axios from "axios";

const VitalTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVitalTasks();
  }, []);

  const fetchVitalTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/vital-tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load vital tasks.");
    }
  };

  const handleAddTask = async () => {
    if (!newTask.text.trim()) return;
    try {
      const res = await axios.post("http://localhost:5001/api/vital-tasks", {
        ...newTask,
        urgent: true, // Mark this task as urgent
      });
      setTasks([...tasks, res.data]); // Add new task to the list
      setNewTask({ text: "", description: "" });
    } catch (err) {
      setError("Failed to add task.");
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Delete this vital task?")) {
      try {
        await axios.delete(`http://localhost:5001/api/vital-tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id)); // Remove deleted task from the list
      } catch (err) {
        setError("Failed to delete task.");
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <img src={logo} alt="Taskly Logo" className="taskly-logo" />
      </div>

      <div className="content">
        <Sidebar />
        <div className="task-container">
          <div className="task-section">
            <div className="task-header">
              <div className="header-left">
                <img src={vitalIcon} alt="Vital Icon" className="task-icon" />
                <h1>Vital Tasks</h1>
              </div>
              <button className="add-task" onClick={handleAddTask}>+ Add task</button>
            </div>

            {/* Task Inputs */}
            <div className="task-inputs">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <p className="task-date">27 Jan - Today</p>
            <div className="task-list">
              {tasks.length === 0 ? (
                <p>No vital tasks to show</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="task-card urgent">
                    <div className="task-content">
                      <h3>{task.text}</h3>
                      <p>{task.description}</p>
                    </div>
                    <button className="menu-btn" onClick={() => handleDeleteTask(task._id)}>
                      <img src={menuIcon} alt="Delete" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalTask;
