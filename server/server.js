const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const supplies = require('./routes/api/supplies');
const grades = require('./routes/api/grades');
const students = require('./routes/api/students');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Conected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/supplies', supplies);
app.use('/api/grades', grades);
app.use('/api/students', students);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));