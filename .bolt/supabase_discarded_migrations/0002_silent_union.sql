/*
  # Initial database schema

  1. Tables
    - users: Store user information and balances
    - withdrawals: Store withdrawal transactions

  2. Indexes
    - Username indexes for fast lookups
    - Timestamp indexes for sorting
*/

-- Users table
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

-- Withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  amount INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);