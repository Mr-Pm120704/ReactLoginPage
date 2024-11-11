import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Check if username is passed in location state, otherwise get it from localStorage
    const nameFromState = location.state?.username;
    const nameFromStorage = localStorage.getItem('username');
    setUsername(nameFromState || nameFromStorage || "Guest");
  }, [location.state]);

  const EmployeeList = () => {
    navigate('/EmployeeList');
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.removeItem('username');  // Clear username from local storage on logout
    navigate('/LoginPage');  // Redirect to login or home page
  };

  return (
    <div>
      <Header username={username} />
      <div className="welcomeStyle">
        <h2>Welcome to the Admin Panel, {username}!</h2>
      </div>
      
    </div>
  );
}

export default Dashboard;
