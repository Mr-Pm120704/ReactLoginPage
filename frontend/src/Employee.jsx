// Employee.jsx
import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Employee() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    designation: '',
    gender: '',
    course: [],
    imageUrl: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state?.isEdit) {
      setIsEdit(true);
      setFormData(location.state.employee); // Load employee data into form fields for editing
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isEdit) {
  //       await axios.put(`http://localhost:5000/api/employees/${formData._id}`, formData);
  //       alert("Employee updated successfully!");
  //     } else {
  //       await axios.post('http://localhost:5000/api/employees', formData);
  //       alert("Employee created successfully!");
  //     }
  //     navigate('/Dashboard');
  //   } catch (error) {
  //     console.error("There was an error submitting the form!", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const response = await axios.post('http://localhost:5000/api/employees', formData);
      alert("Employee created successfully!");
      localStorage.setItem('username', formData.username); // Save username to local storage
      navigate('/Dashboard');
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  
  const login = () => {
    navigate('/LoginPage');
  };

  return (
    <>
      <div className='Emp-login-container'>
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User Name: </label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="number">Mobile No: </label>
            <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="designation">Designation:</label>
            <select id="designation" name="designation" value={formData.designation} onChange={handleChange} required>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label>Gender:</label>
            <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
            <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
          </div>
          <div>
            <label>Course:</label>
            <input type="checkbox" id="mca" name="course" value="MCA" onChange={handleCheckboxChange} checked={formData.course.includes('MCA')} /> MCA
            <input type="checkbox" id="bca" name="course" value="BCA" onChange={handleCheckboxChange} checked={formData.course.includes('BCA')} /> BCA
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={handleCheckboxChange} checked={formData.course.includes('BSC')} /> BSC
          </div>
          <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={(e) => setFormData(prevState => ({
              ...prevState,
              imageUrl: URL.createObjectURL(e.target.files[0])
            }))} />
          </div>
          <button type="submit">{isEdit ? "Update" : "Submit"}</button>
        </form><br />
        <p className="register-link">You have an account? <span onClick={login}>Login Here</span></p>
      </div>
    </>
  );
}

export default Employee;
