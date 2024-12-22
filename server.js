const express = require('express');
const path = require('path');
const cors = require('cors');
const { getDb } = require('./src/config/database');
const { errorHandler } = require('./src/middleware/errorHandler');
const { validateWithdrawal } = require('./src/utils/validators');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Withdrawal endpoint
app.post('/api/withdrawals', async (req, res) => {
    try {
        const { username, walletAddress, amount } = req.body;
        
        // Validate withdrawal request
        validateWithdrawal(amount, walletAddress);

        const db = await getDb();
        
        // Start transaction
        await db.run('BEGIN TRANSACTION');

        try {
            // Update user balance
            const result = await db.run(
                'UPDATE users SET balance = balance - ? WHERE username = ? AND balance >= ?',
                [amount, username, amount]
            );

            if (result.changes === 0) {
                throw new Error('Insufficient balance or user not found');
            }

            // Create withdrawal record
            await db.run(
                `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
                 VALUES (?, ?, ?, datetime('now'))`,
                [username, walletAddress, amount]
            );

            await db.run('COMMIT');
            res.json({ success: true });
        } catch (error) {
            await db.run('ROLLBACK');
            throw error;
        }
    } catch (error) {
        console.error('Withdrawal error:', error);
        res.status(400).json({ 
            success: false, 
            error: error.message || 'Withdrawal failed'
        });
    }
});

// Existing routes...
app.get('/api/users', async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.all('SELECT * FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.get('/api/withdrawals', async (req, res) => {
    try {
        const db = await getDb();
        const withdrawals = await db.all('SELECT * FROM withdrawals ORDER BY timestamp DESC');
        res.json(withdrawals);
    } catch (error) {
        console.error('Error fetching withdrawals:', error);
        res.status(500).json({ error: 'Error fetching withdrawals' });
    }
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});