const express = require('express');
const path = require('path');
const cors = require('cors');
const { getDb } = require('./src/config/database');
const { errorHandler } = require('./src/middleware/errorHandler');
const { validateWithdrawal } = require('./src/utils/validators');
const { setupRoutes } = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
setupRoutes(app);

// Withdrawal endpoint with improved error handling
app.post('/api/withdrawals', async (req, res) => {
    try {
        const { username, walletAddress, amount } = req.body;
        
        // Validate withdrawal request
        validateWithdrawal(amount, walletAddress);

        const db = await getDb();
        
        // Start transaction
        await db.run('BEGIN TRANSACTION');

        try {
            // Check user balance
            const user = await db.get(
                'SELECT balance FROM users WHERE username = ?',
                [username]
            );

            if (!user) {
                throw new Error('User not found');
            }

            if (user.balance < amount) {
                throw new Error('Insufficient balance');
            }

            // Update user balance
            await db.run(
                'UPDATE users SET balance = balance - ? WHERE username = ?',
                [amount, username]
            );

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

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});