import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ username }) {
  const navigate = useNavigate();
  const EmployeeList = () => {
    navigate('/EmployeeList');
  };
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate('/LoginPage');
  };
  const dashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <header className="headerStyle">
      <div>
        <img src="logo.png" alt="Logo" style={{ height: '50px' }} />
      </div>
      <nav className="navStyle">
        <a href="#" onClick={dashboard}>Home</a>
        <a href="#" onClick={EmployeeList}>Employee List</a>
        <span style={{ margin: '0 15px' }}>{username}</span> 
        <a href="#" onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  );
}
export default Header;
