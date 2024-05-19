const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const passUserToViews = require('./middleware/passUserToViews');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passUserToViews); // Use the middleware to pass user to all views

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

// Render home page
app.get('/', (req, res) => {
  res.render('index');
});

// Render login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Render signup page
app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
