import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import logo from "../assets/taskly-logo.png";
import welcomeImg from "../assets/welcome.png";
import thinkingImg from "../assets/thinking.png"; // Importing thinking image

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="topbar">
        <img src={logo} alt="Taskly Logo" className="taskly-logo" />
      </div>
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <img src={welcomeImg} alt="Welcome" className="welcome-img" />
          <div className="images">
            <img src={thinkingImg} alt="Thinking" className="thinking-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
