/*
  # Database Schema Update
  
  1. Tables
    - users: Store user information and balances
    - withdrawals: Track withdrawal requests
  
  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
    
  Note: This migration safely handles existing tables and policies
*/

-- Create tables if they don't exist
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

CREATE TABLE IF NOT EXISTS withdrawals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username text NOT NULL,
    wallet_address text NOT NULL,
    amount integer NOT NULL,
    timestamp timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Safely create or replace policies
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can read own data" ON users;
    DROP POLICY IF EXISTS "Users can update own data" ON users;
    DROP POLICY IF EXISTS "Users can read own withdrawals" ON withdrawals;
    DROP POLICY IF EXISTS "Users can create withdrawals" ON withdrawals;

    -- Create new policies
    CREATE POLICY "Users can read own data v2"
        ON users FOR SELECT
        TO authenticated
        USING (auth.uid()::text = username);

    CREATE POLICY "Users can update own data v2"
        ON users FOR UPDATE
        TO authenticated
        USING (auth.uid()::text = username);

    CREATE POLICY "Users can read own withdrawals v2"
        ON withdrawals FOR SELECT
        TO authenticated
        USING (auth.uid()::text = username);

    CREATE POLICY "Users can create withdrawals v2"
        ON withdrawals FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid()::text = username);
END
$$;