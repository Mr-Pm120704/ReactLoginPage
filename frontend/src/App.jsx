import React from 'react';
import { UserProvider } from './UserContext.jsx'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import Dashboard from './Dashboard.jsx';
import Employee from './Employee.jsx'
import EmployeeEdit from './EmployeeEdit.jsx'
import Employeelist from './Employeelist.jsx'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/EmployeeEdit" element={<EmployeeEdit />} />
          <Route path="/Employeelist" element={<Employeelist />} />
          <Route path="/UserProvider" element={<UserProvider />} />
        </Routes>
      </Router>
  );
}

export default App;
