// app.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Mock authentication middleware for the purpose of this example
app.use((req, res, next) => {
    req.user = { name: 'Guest', role: 'guest' }; // Remove this in production
    next();
});

// Render home page
app.get('/', (req, res) => {
    const user = req.user || { name: 'Guest', role: 'guest' };
    res.render('index', { user });
});

module.exports = app;
