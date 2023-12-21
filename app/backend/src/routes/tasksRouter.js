const express = require('express');
const { tasksController } = require('../controllers');

const router = express.Router();

router.get('/tasks', tasksController.getAllTasks);

router.get('/tasks/:id', tasksController.getTaskById);

router.put('/tasks/:id', tasksController.setTaskById);

router.post('/tasks', tasksController.addTask);

router.delete('/tasks/:id', tasksController.deleteTaskById);

module.exports = router;
