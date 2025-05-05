import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import profile from "../assets/profile.png";

import dashboardIcon from "../assets/dashboard.png";
import vitalTaskIcon from "../assets/vital-task.png";
import myTaskIcon from "../assets/my-task.png";
import taskCategoriesIcon from "../assets/task-categories.png";
import calendarIcon from "../assets/calendar.png";
import helpIcon from "../assets/help.png";
import logoutIcon from "../assets/logout.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove auth token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={profile} alt="Profile" className="profile" />
      </div>
      <ul className="menu">
        <li
          className={activePage === "/Dashboard" ? "menu-item active" : "menu-item"}
          onClick={() => handleNavigation("/Dashboard")}
        >
          <img src={dashboardIcon} alt="Dashboard" className="menu-icon" />
          <span>Dashboard</span>
        </li>
        <li
          className={activePage === "/Vitals" ? "menu-item active" : "menu-item"}
          onClick={() => handleNavigation("/Vitals")}
        >
          <img src={vitalTaskIcon} alt="Vital Task" className="menu-icon" />
          <span>Vital Task</span>
        </li>
        <li
          className={activePage === "/MyTasks" ? "menu-item active" : "menu-item"}
          onClick={() => handleNavigation("/MyTasks")}
        >
          <img src={myTaskIcon} alt="My Task" className="menu-icon" />
          <span>My Task</span>
        </li>
        <li
          className={activePage === "/Calendar" ? "menu-item active" : "menu-item"}
          onClick={() => handleNavigation("/Calendar")}
        >
          <img src={calendarIcon} alt="Calendar" className="menu-icon" />
          <span>Calendar</span>
        </li>
      </ul>
      <button className="logout" onClick={handleLogout}>
        <img src={logoutIcon} alt="Logout" className="logout-icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
