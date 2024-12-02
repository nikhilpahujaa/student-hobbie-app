const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const hobbiesRoutes = require('./routes/hobbiesRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/students', studentRoutes);
app.use('/hobbies', hobbiesRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/student-hobbies-db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
