import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/taskly-logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "Taskly" && password.trim() === "Taskly") {
      localStorage.setItem("authToken", "loggedIn"); // Save auth state
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      setError("Invalid Username or Password!");
      setTimeout(() => setError(""), 3000); // Clear error after 3 sec
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Taskly Logo" className="taskly-logo" />

          <h2>Sign In</h2>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="illustration"></div>
      </div>
    </div>
  );
}

export default Login;
