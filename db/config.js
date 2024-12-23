import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'database.sqlite');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful');
  }
});

// Promise wrapper for database operations
export const dbAsync = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },
  
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

// Helper functions for common database operations
export async function findUser(username) {
  return await dbAsync.get(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
}

export async function createUser(userData) {
  const result = await dbAsync.run(
    `INSERT INTO users (username, balance, tasks_completed, last_login)
     VALUES (?, ?, ?, ?)`,
    [
      userData.username,
      userData.balance || 500000,
      JSON.stringify([]),
      new Date().toISOString()
    ]
  );
  return { id: result.lastID, ...userData };
}

export async function updateUser(username, updates) {
  await dbAsync.run(
    `UPDATE users 
     SET balance = COALESCE(?, balance),
         tasks_completed = COALESCE(?, tasks_completed),
         last_login = COALESCE(?, last_login)
     WHERE username = ?`,
    [
      updates.balance,
      updates.tasks_completed ? JSON.stringify(updates.tasks_completed) : undefined,
      new Date().toISOString(),
      username
    ]
  );
  return findUser(username);
}

export async function createWithdrawal(withdrawalData) {
  const result = await dbAsync.run(
    `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
     VALUES (?, ?, ?, ?)`,
    [
      withdrawalData.username,
      withdrawalData.wallet_address,
      withdrawalData.amount,
      withdrawalData.timestamp || new Date().toISOString()
    ]
  );
  return { id: result.lastID, ...withdrawalData };
}

export async function getAllWithdrawals() {
  return await dbAsync.all(
    'SELECT * FROM withdrawals ORDER BY timestamp DESC'
  );
}