// Middleware to pass user data to all views
module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};
