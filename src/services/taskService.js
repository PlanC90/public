const { getDb } = require('../config/database');

const taskService = {
    async getAllTasks() {
        const db = await getDb();
        return await db.all('SELECT * FROM tasks ORDER BY id');
    },

    async getCompletedTasks(userId) {
        const db = await getDb();
        return await db.all(
            `SELECT t.* FROM tasks t
             INNER JOIN completed_tasks ct ON t.id = ct.task_id
             WHERE ct.user_id = ?`,
            userId
        );
    },

    async completeTask(userId, taskId) {
        const db = await getDb();
        try {
            await db.run('BEGIN TRANSACTION');

            // Get task details
            const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            // Check completion count for repeatable tasks
            const completionCount = await db.get(
                'SELECT COUNT(*) as count FROM completed_tasks WHERE user_id = ? AND task_id = ?',
                [userId, taskId]
            );

            if (completionCount.count >= task.max_rewards) {
                throw new Error('Maximum completions reached');
            }

            // Record task completion
            await db.run(
                'INSERT INTO completed_tasks (user_id, task_id) VALUES (?, ?)',
                [userId, taskId]
            );

            // Update user balance
            await db.run(
                'UPDATE users SET balance = balance + ? WHERE id = ?',
                [task.reward, userId]
            );

            await db.run('COMMIT');
            return { success: true, reward: task.reward };
        } catch (error) {
            await db.run('ROLLBACK');
            throw error;
        }
    }
};

module.exports = { taskService };