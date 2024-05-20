const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Manager routes
router.get('/manager', ensureAuth, taskController.getManagerPage);
router.post('/manager/add', ensureAuth, taskController.addTask);
router.get('/manager/edit/:id', ensureAuth, taskController.getEditTaskPage);
router.post('/manager/edit/:id', ensureAuth, taskController.editTask);
router.post('/manager/priority/:id', ensureAuth, taskController.updatePriority);

// Employee routes
router.get('/employee', ensureAuth, taskController.getEmployeePage);
router.post('/employee/complete/:id', ensureAuth, taskController.completeTask);

module.exports = router;
