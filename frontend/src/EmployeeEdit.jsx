import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { useLocation, useNavigate } from 'react-router-dom';

function EmployeeEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    designation: '',
    gender: '',
    course: [],
    imageUrl: ''
  });

  useEffect(() => {
    if (location.state?.employee) {
      setFormData(location.state.employee);  // Load employee data into form fields
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      course: checked
        ? [...prevState.course, value]
        : prevState.course.filter(course => course !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${formData._id}`, formData);
      alert("Employee updated successfully!");
      navigate('/EmployeeList');  // Redirect back to the employee list
    } catch (error) {
      console.error("There was an error updating the employee!", error);
    }
  };

  return (
    <div className='Emp-login-container'>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No:</label>
          <input type="text" name="number" value={formData.number} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
        </div>
        <div>
          <label>Course:</label>
          <input type="checkbox" name="course" value="MCA" checked={formData.course.includes("MCA")} onChange={handleCheckboxChange} /> MCA
          <input type="checkbox" name="course" value="BCA" checked={formData.course.includes("BCA")} onChange={handleCheckboxChange} /> BCA
          <input type="checkbox" name="course" value="BSC" checked={formData.course.includes("BSC")} onChange={handleCheckboxChange} /> BSC
        </div>
        <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={(e) => setFormData(prevState => ({
              ...prevState,
              imageUrl: URL.createObjectURL(e.target.files[0])
            }))} />
          </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EmployeeEdit;
