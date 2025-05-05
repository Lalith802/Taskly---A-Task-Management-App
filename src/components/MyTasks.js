import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/MyTasks.css";
import logo from "../assets/taskly-logo.png";
import menuIcon from "../assets/menu-icon.png";
import todoIcon from "../assets/todo-icon.png";
import completedIcon from "../assets/completed-icon.png";
import axios from "axios";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ text: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5001/api/tasks", { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  const handleAddTask = async () => {
    if (!newTask.text.trim()) return;
    try {
      const res = await axios.post("http://localhost:5001/api/tasks", newTask, { withCredentials: true });
      setTasks([...tasks, res.data]);
      setNewTask({ text: "", description: "" });
    } catch (error) {
      setError("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/tasks/${id}`,
        { completed: !completed },
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5001/api/tasks/${id}`, { withCredentials: true });
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        setError("Failed to delete task. Please try again.");
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({ text: task.text, description: task.description });
  };

  const handleSaveTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/tasks/${id}`,
        { ...editedTask },
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setEditingTaskId(null);
      setEditedTask({ text: "", description: "" });
    } catch (error) {
      setError("Failed to save task. Please try again.");
      console.error("Error saving task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask({ text: "", description: "" });
  };

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <img src={logo} alt="Taskly Logo" className="taskly-logo" />
      </div>

      <div className="content">
        <Sidebar />
        <div className="task-container">
          {/* To-Do Section */}
          <div className="task-section">
            <div className="task-header">
              <div className="header-left">
                <img src={todoIcon} alt="To-Do Icon" className="task-icon" />
                <h2>To-Do</h2>
              </div>
              <button className="add-task" onClick={handleAddTask}>+ Add task</button>
            </div>

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

            {loading && <div>Loading...</div>}
            {error && <div className="error-message">{error}</div>}

            <p className="task-date">20 June - Today</p>
            <div className="task-list">
              {tasks.filter((task) => !task.completed).length === 0 ? (
                <p>No tasks to show</p>
              ) : (
                tasks.filter((task) => !task.completed).map((task) => (
                  <div key={task._id} className="task-card">
                    {editingTaskId === task._id ? (
                      <div className="task-edit">
                        <input
                          value={editedTask.text}
                          onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                        />
                        <textarea
                          value={editedTask.description}
                          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        />
                        <div className="task-actions">
                          <button onClick={() => handleSaveTask(task._id)}>Save</button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="task-content" onClick={() => handleToggleComplete(task._id, task.completed)}>
                          <h3>{task.text}</h3>
                          <p>{task.description}</p>
                        </div>
                        <div className="task-actions">
                          <button onClick={() => handleEditTask(task)}>Edit</button>
                          <button onClick={() => handleDeleteTask(task._id)}>
                            <img src={menuIcon} alt="Delete" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Completed Section */}
          <div className="task-section">
            <div className="task-header">
              <div className="header-left">
                <img src={completedIcon} alt="Completed Icon" className="task-icon" />
                <h2>Completed Task</h2>
              </div>
            </div>
            <div className="task-list">
              {tasks.filter((task) => task.completed).length === 0 ? (
                <p>No completed tasks</p>
              ) : (
                tasks.filter((task) => task.completed).map((task) => (
                  <div key={task._id} className="task-card completed">
                    <div className="task-content" onClick={() => handleToggleComplete(task._id, task.completed)}>
                      <h3>{task.text}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                      <button onClick={() => handleDeleteTask(task._id)}>
                        <img src={menuIcon} alt="Delete" />
                      </button>
                    </div>
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

export default MyTasks;
