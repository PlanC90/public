const express = require('express');
const { taskService } = require('../services/taskService');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/complete', async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const result = await taskService.completeTask(userId, taskId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;