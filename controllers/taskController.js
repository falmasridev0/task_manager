const Task = require('../models/Task');
const User = require('../models/User');

// Manager page
exports.getManagerPage = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user._id, completed: false }).populate('assignedTo', 'name');
    const completedTasks = await Task.find({ assignedBy: req.user._id, completed: true }).populate('assignedTo', 'name');
    const employees = await User.find({ role: 'employee' });
    res.render('manager', { user: req.user, tasks, completedTasks, employees });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Employee page
exports.getEmployeePage = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id, completed: false });
    const completedTasks = await Task.find({ assignedTo: req.user._id, completed: true });
    res.render('employee', { user: req.user, tasks, completedTasks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    let assignedTo = req.body.assignedTo;
    if (!Array.isArray(assignedTo)) {
      assignedTo = [assignedTo];
    }
    const newTask = new Task({
      title,
      description,
      assignedBy: req.user._id,
      assignedTo,
      priority
    });
    await newTask.save();
    res.redirect('/tasks/manager');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render the edit task page
exports.getEditTaskPage = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name');
    const employees = await User.find({ role: 'employee' });
    res.render('editTask', { user: req.user, task, employees });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Edit Task
exports.editTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    let assignedTo = req.body.assignedTo;
    if (!Array.isArray(assignedTo)) {
      assignedTo = [assignedTo];
    }
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      assignedTo,
      priority
    });
    res.redirect('/tasks/manager');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update Priority
exports.updatePriority = async (req, res) => {
  try {
    const { priority } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { priority });
    res.redirect('/tasks/manager');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Complete Task
exports.completeTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { completed: true });
    res.redirect('/tasks/employee');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
