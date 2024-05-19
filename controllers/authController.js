const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).render('signup', { error: 'Account already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });

    if (role === 'manager') {
      res.redirect('/tasks/manager');
    } else {
      res.redirect('/tasks/employee');
    }
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server Error');
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render('login', { error: 'Account does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render('login', { error: 'Password is incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });

    if (user.role === 'manager') {
      res.redirect('/tasks/manager');
    } else {
      res.redirect('/tasks/employee');
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server Error');
  }
};

// Logout
exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
};
