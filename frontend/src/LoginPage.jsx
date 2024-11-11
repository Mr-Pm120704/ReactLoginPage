// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Function to dynamically generate password based on username
//   const generatePassword = (username) => {
//     return username + "123"; // Append '123' to the username
//   };

//   const register = () => {
//     navigate('/Employee');
//   };

//   const validateLogin = (e) => {
//     e.preventDefault();
    
//     const enteredUsername = document.getElementById("username").value.trim();
//     if (!enteredUsername) {
//       alert("Username is required");
//       return;
//     }

//     const enteredPassword = document.getElementById("password").value.trim();
//     if (!enteredPassword) {
//       alert("Password is required");
//       return;
//     }

//     // Generate the correct password based on the entered username
//     const expectedPassword = generatePassword(enteredUsername);

//     // Check if entered password matches the generated password
//     if (enteredPassword !== expectedPassword) {
//       alert("Incorrect password. Please try again.");
//       return;
//     }

//     // Successful login
//     alert("Login successful");
//     navigate('/dashboard', { state: { username: enteredUsername } });
//   };

//   return (
//     <div className='login-container'>
//       <h1>Login Page</h1>
//       <form onSubmit={validateLogin}>
//         <div>
//           <label htmlFor="username">User Name: </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="password">Password: </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//       <p className="register-link">
//         Don't have an account? <a onClick={register}>Register here</a>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;



import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to dynamically generate password based on username
  const generatePassword = (username) => {
    return username + "123"; // Append '123' to the username
  };

  const register = () => {
    navigate('/Employee');
  };

  const validateLogin = async (e) => {
    e.preventDefault();
    
    const enteredUsername = document.getElementById("username").value.trim();
    if (!enteredUsername) {
      alert("Username is required");
      return;
    }

    const enteredPassword = document.getElementById("password").value.trim();
    if (!enteredPassword) {
      alert("Password is required");
      return;
    }

    try {
      // Fetch only usernames from the database
      const response = await axios.get('http://localhost:5000/api/employees');
      const existingUsernames = response.data.map(employees => employees.username);

      // Check if username exists
      if (!existingUsernames.includes(enteredUsername)) {
        alert("Username does not exist. Please register first.");
        return;
      }

      // Generate the correct password based on the entered username
      const expectedPassword = generatePassword(enteredUsername);

      // Check if entered password matches the generated password
      if (enteredPassword !== expectedPassword) {
        alert("Incorrect password. Please try again.");
        return;
      }

      // Successful login
      alert("Login successful");
      navigate('/dashboard', { state: { username: enteredUsername } });
    } catch (error) {
      console.error("Error checking username:", error);
      alert("Error validating login. Please try again.");
    }
  };

  return (
    <div className='login-container'>
      <h1>Login Page</h1>
      <form onSubmit={validateLogin}>
        <div>
          <label htmlFor="username">User Name: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p className="register-link">
        Don't have an account? <a onClick={register}>Register here</a>
      </p>
    </div>
  );
}

export default LoginPage;
