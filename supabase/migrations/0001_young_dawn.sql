/*
  # Initial database schema

  1. Tables
    - users
      - id (INTEGER PRIMARY KEY)
      - username (TEXT UNIQUE)
      - balance (INTEGER)
      - tasks_completed (TEXT) - JSON array
      - referral_earnings (INTEGER)
      - total_referrals (INTEGER) 
      - last_login (TEXT)
      - created_at (TEXT)
    
    - withdrawals
      - id (INTEGER PRIMARY KEY)
      - username (TEXT)
      - wallet_address (TEXT)
      - amount (INTEGER)
      - timestamp (TEXT)
      - created_at (TEXT)
*/

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  balance INTEGER DEFAULT 500000,
  tasks_completed TEXT DEFAULT '[]',
  referral_earnings INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  last_login TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  amount INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);