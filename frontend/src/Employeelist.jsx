// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import './App.css';

// function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const username = location.state?.username || "Guest";

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/employees');
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/employees/${id}`);
//         setEmployees(employees.filter(employee => employee._id !== id));
//         alert("Employee deleted successfully");
//       } catch (error) {
//         console.error("Error deleting employee:", error);
//         alert("Failed to delete employee");
//       }
//     }
//   };

//   const handleEdit = (employee) => {
//     navigate('/EmployeeEdit', { state: { employee } });
//   };

//   const createEmployee = () => {
//     navigate('/Employee');
//   };

//   // Filter and sort employees based on search and sort criteria
//   const filteredEmployees = employees.filter(employee =>
//     employee.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   const sortedEmployees = filteredEmployees.sort((a, b) => {
//     if (sortBy === "name") return a.username.localeCompare(b.username);
//     if (sortBy === "email") return a.email.localeCompare(b.email);
//     if (sortBy === "id") return a._id.localeCompare(b._id);
//     if (sortBy === "date") return new Date(a.createdDate) - new Date(b.createdDate);
//     return 0;
//   });

//   return (
//     <div>
//       <Header username={username} />

//       <div className="employeeListContainer">
//         <h2>Employee List</h2><br />
//         <div className="employeeActions">
//           <span>Total Count: {employees.length}</span>
//           <button className="createEmployeeButton" onClick={createEmployee}>Create Employee</button>
//         </div>

//         <div className="searchContainer">
//           <label>Search: </label>
//           <input 
//             type="text" 
//             placeholder="Enter Search Keyword" 
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)} 
//           />
//         </div>

//         <table className="employeeTable">
//           <thead>
//             <tr>
//               <th>Unique Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile No</th>
//               <th>Designation</th>
//               <th>Gender</th>
//               <th>Course</th>
//               <th>Create Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedEmployees.map(employee => (
//               <tr key={employee._id}>
//                 <td>{employee._id}</td>
//                 <td>{employee.username}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.number}</td>
//                 <td>{employee.designation}</td>
//                 <td>{employee.gender}</td>
//                 <td>{employee.course.join(", ")}</td>
//                 <td>{new Date(employee.createdDate).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleEdit(employee)}>Edit</button>
//                   <button onClick={() => handleDelete(employee._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default EmployeeList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Manage username by checking location.state or localStorage
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Retrieve the username from location state or localStorage
    const nameFromState = location.state?.username;
    const nameFromStorage = localStorage.getItem('username');
    setUsername(nameFromState || nameFromStorage || "Guest");

    fetchEmployees();
  }, [location.state]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        setEmployees(employees.filter(employee => employee._id !== id));
        alert("Employee deleted successfully");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  const handleEdit = (employee) => {
    navigate('/EmployeeEdit', { state: { employee } });
  };

  const createEmployee = () => {
    navigate('/Employee');
  };

  // Filter and sort employees based on search and sort criteria
  const filteredEmployees = employees.filter(employee =>
    employee.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortBy === "name") return a.username.localeCompare(b.username);
    if (sortBy === "email") return a.email.localeCompare(b.email);
    if (sortBy === "id") return a._id.localeCompare(b._id);
    if (sortBy === "date") return new Date(a.createdDate) - new Date(b.createdDate);
    return 0;
  });

  return (
    <div>
      <Header username={username} />

      <div className="employeeListContainer">
        <h2>Employee List</h2><br />
        <div className="employeeActions">
          <span>Total Count: {employees.length}</span>
          <button className="createEmployeeButton" onClick={createEmployee}>Create Employee</button>
        </div>

        <div className="searchContainer">
          <label>Search: </label>
          <input 
            type="text" 
            placeholder="Enter Search Keyword" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} 
          />
        </div>

        <table className="employeeTable">
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.number}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(", ")}</td>
                <td>{new Date(employee.createdDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
