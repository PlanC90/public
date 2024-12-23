/*
  # Initial Database Schema

  1. New Tables
    - users: Store user information and balances
      - id (uuid, primary key)
      - username (text, unique)
      - balance (integer)
      - tasks_completed (jsonb)
      - referral_earnings (integer)
      - total_referrals (integer)
      - last_login (timestamptz)
      - created_at (timestamptz)
    
    - withdrawals: Track withdrawal requests
      - id (uuid, primary key)
      - username (text)
      - wallet_address (text)
      - amount (integer)
      - timestamp (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for user data access
    - Add policies for withdrawal management
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username text UNIQUE NOT NULL,
    balance integer DEFAULT 500000,
    tasks_completed jsonb DEFAULT '[]'::jsonb,
    referral_earnings integer DEFAULT 0,
    total_referrals integer DEFAULT 0,
    last_login timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- Create withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username text NOT NULL,
    wallet_address text NOT NULL,
    amount integer NOT NULL,
    timestamp timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid()::text = username);

CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = username);

CREATE POLICY "Users can read own withdrawals"
    ON withdrawals FOR SELECT
    TO authenticated
    USING (auth.uid()::text = username);

CREATE POLICY "Users can create withdrawals"
    ON withdrawals FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = username);