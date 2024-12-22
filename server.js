const express = require('express');
const path = require('path');
const cors = require('cors');
const { getDb } = require('./src/config/database');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/tasks', taskRoutes);

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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});