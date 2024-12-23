-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  reward INTEGER NOT NULL,
  max_rewards INTEGER DEFAULT 1,
  link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create completed_tasks table for tracking user task completion
CREATE TABLE IF NOT EXISTS completed_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  UNIQUE(user_id, task_id)
);

-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  balance INTEGER DEFAULT 500000,
  referral_earnings INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  last_login TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create withdrawals table if not exists
CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  amount INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default tasks
INSERT OR IGNORE INTO tasks (type, title, description, reward, max_rewards, link) VALUES
('telegram', 'Join PlanC Telegram Group', 'Join our official Telegram group', 50000, 1, 'https://t.me/PlancSpace'),
('telegram', 'Join ElectraProtocol Telegram Group', 'Join EP Telegram group', 50000, 1, 'https://t.me/ElectraProtocol'),
('telegram', 'Join ElectraProtocol Turkish Group', 'Join EP Turkish group', 50000, 1, 'https://t.me/ElectraProtocol_Turkish'),
('telegram', 'Join MemeX😊 Telegram Channel', 'Join MemeX channel', 50000, 1, 'https://t.me/memexairdropchannel'),
('exchange', 'KCEX Exchange Register', 'Register on KCEX Exchange', 200000, 1, 'https://www.kcex.io/?inviteCode=T13UUV'),
('follow', 'Follow MemeX😊', 'Follow MemeX on Twitter', 10000, 1, 'https://x.com/memexairdrop'),
('tweet', 'Share on Twitter', 'Share MemeX on Twitter', 10000, 100, NULL),
('referral', 'Share & Earn', 'Share your referral link', 10000, 100, NULL);