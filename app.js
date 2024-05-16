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
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Render home page
app.get('/', (req, res) => {
    const user = req.user || { name: 'Guest', role: 'guest' };  // Placeholder user if none is authenticated
    res.render('index', { user });
});

// Render login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Render signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = app;
