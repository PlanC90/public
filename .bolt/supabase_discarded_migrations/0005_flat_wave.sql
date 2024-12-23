-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  balance INTEGER DEFAULT 500000,
  tasks_completed JSONB DEFAULT '[]',
  referral_earnings INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  wallet_address VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);