const express = require('express');
const { getDb } = require('../config/database');
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.all('SELECT * FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get all withdrawals
router.get('/withdrawals', async (req, res) => {
    try {
        const db = await getDb();
        const withdrawals = await db.all('SELECT * FROM withdrawals ORDER BY timestamp DESC');
        res.json(withdrawals);
    } catch (error) {
        console.error('Error fetching withdrawals:', error);
        res.status(500).json({ error: 'Error fetching withdrawals' });
    }
});

module.exports = router;