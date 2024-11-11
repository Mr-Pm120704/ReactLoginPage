Mongo_Connect_String='mongodb+srv://muruganandhamm7639:8PqDNvNTo2GojCif@cluster0.hlroj.mongodb.net/EmployeeDB?retryWrites=true&w=majority&appName=Cluster0';
// Existing imports and code
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//const Mongo_Connect_String = 'YOUR_MONGODB_CONNECTION_STRING';

// Connect to MongoDB
mongoose.connect(Mongo_Connect_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Define Employee schema and model
const employeeSchema = new mongoose.Schema({
  username: String,
  email: String,
  number: String,
  designation: String,
  gender: String,
  course: [String],
  imageUrl: String,
  createdDate: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

// POST endpoint to create an employee (existing code)
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee added successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add employee.", error });
  }
});

// GET endpoint to fetch all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();  // Fetch all employees
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees.", error });
  }
});

// DELETE endpoint to delete an employee by ID
app.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

// PUT endpoint to update an employee by ID
app.put('/api/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
});

// Add this route in `server.js` to check if a user exists
app.post('/api/checkUser', async (req, res) => {
  const { username } = req.body;
  try {
    const userExists = await Employee.findOne({ username });
    if (userExists) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

