const jwt = require('jsonwebtoken');
const User = require('../models/User');

// user authentication
exports.ensureAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find user by ID 
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      // Redirect to login if verification fails
      res.redirect('/login');
    }
  } else {
    // if there is no account
    res.redirect('/login');
  }
};
