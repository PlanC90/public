const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function getDb() {
  if (db) return db;
  
  db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  // Initialize tables if they don't exist
  await initializeTables(db);
  
  return db;
}

async function initializeTables(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      balance INTEGER DEFAULT 500000,
      tasks_completed TEXT DEFAULT '[]',
      referral_earnings INTEGER DEFAULT 0,
      total_referrals INTEGER DEFAULT 0,
      last_login TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS withdrawals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      wallet_address TEXT NOT NULL,
      amount INTEGER NOT NULL,
      timestamp TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}

module.exports = {
  getDb,
  closeDb
};