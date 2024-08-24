// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error(' Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
});

// POST endpoint to add a new course
app.post('/add-course', (req, res) => {
  const { course_name, course_duration, course_price } = req.body;

  // Validate request body
  if (!course_name || !course_duration || !course_price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO course (course_name, course_duration, course_price) VALUES (?, ?, ?)';
  const values = [course_name, course_duration, course_price];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(' Error inserting course:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'Course added successfully',
      course: {
        course_id: results.insertId,
        course_name,
        course_duration,
        course_price,
      },
    });
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
