import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data storage helpers
async function readJsonFile(filename) {
  try {
    const data = await fs.readFile(path.join(__dirname, 'public/data', filename), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

async function writeJsonFile(filename, data) {
  try {
    await fs.writeFile(
      path.join(__dirname, 'public/data', filename),
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await readJsonFile('users.json');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users' });
  }
});

app.get('/api/withdrawals', async (req, res) => {
  try {
    const withdrawals = await readJsonFile('withdrawals.json');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: 'Error reading withdrawals' });
  }
});

app.post('/api/withdrawals', async (req, res) => {
  try {
    const withdrawals = await readJsonFile('withdrawals.json');
    const newWithdrawal = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    withdrawals.push(newWithdrawal);
    await writeJsonFile('withdrawals.json', withdrawals);
    res.json(newWithdrawal);
  } catch (error) {
    res.status(500).json({ error: 'Error saving withdrawal' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const users = await readJsonFile('users.json');
    const newUser = {
      ...req.body,
      balance: req.body.balance || 500000,
      tasks_completed: req.body.tasks_completed || [],
      last_login: new Date().toISOString()
    };
    users.push(newUser);
    await writeJsonFile('users.json', users);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error saving user' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});