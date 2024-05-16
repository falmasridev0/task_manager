// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

// Create task
router.post('/', auth, createTask);

// Get all tasks
router.get('/', auth, getTasks);

// Update task
router.put('/:id', auth, updateTask);

// Delete task
router.delete('/:id', auth, deleteTask);

module.exports = router;
