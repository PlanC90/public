/*
  # Add withdrawal functionality and improvements

  1. New Tables
    - `withdrawal_logs` - Track withdrawal processing history
      - `id` (uuid, primary key)
      - `withdrawal_id` (uuid, references withdrawals)
      - `status` (withdrawal_status)
      - `processed_at` (timestamptz)
      - `notes` (text)

  2. Changes
    - Add status tracking to withdrawals table
    - Add validation constraints
    - Add processing metadata
    
  3. Security
    - Enable RLS on new tables
    - Add policies for withdrawal management
    - Add validation triggers
*/

-- Create withdrawal status enum
CREATE TYPE withdrawal_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed'
);

-- Add status and processing columns to withdrawals
ALTER TABLE withdrawals
ADD COLUMN status withdrawal_status NOT NULL DEFAULT 'pending',
ADD COLUMN processed_at timestamptz,
ADD COLUMN processor_notes text;

-- Create withdrawal logs table
CREATE TABLE withdrawal_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  withdrawal_id uuid REFERENCES withdrawals(id) NOT NULL,
  status withdrawal_status NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now(),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Add wallet address validation
ALTER TABLE withdrawals
ADD CONSTRAINT valid_wallet_address 
CHECK (wallet_address ~ '^x[A-Za-z0-9]{25,35}$');

-- Add amount validation
ALTER TABLE withdrawals
ADD CONSTRAINT valid_withdrawal_amount
CHECK (amount >= 100000);

-- Create function to process withdrawal
CREATE OR REPLACE FUNCTION process_withdrawal()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has sufficient balance
  IF NOT EXISTS (
    SELECT 1 FROM users 
    WHERE username = NEW.username 
    AND balance >= NEW.amount
  ) THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  -- Deduct amount from user balance
  UPDATE users 
  SET balance = balance - NEW.amount
  WHERE username = NEW.username;

  -- Create initial log entry
  INSERT INTO withdrawal_logs (withdrawal_id, status, notes)
  VALUES (NEW.id, NEW.status, 'Withdrawal initiated');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create withdrawal processing trigger
CREATE TRIGGER withdrawal_processor
  BEFORE INSERT ON withdrawals
  FOR EACH ROW
  EXECUTE FUNCTION process_withdrawal();

-- Create function to track withdrawal status changes
CREATE OR REPLACE FUNCTION log_withdrawal_status()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO withdrawal_logs (withdrawal_id, status, notes)
    VALUES (NEW.id, NEW.status, NEW.processor_notes);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create status change tracking trigger
CREATE TRIGGER withdrawal_status_tracker
  AFTER UPDATE ON withdrawals
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION log_withdrawal_status();

-- Enable RLS
ALTER TABLE withdrawal_logs ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can view own withdrawal logs"
  ON withdrawal_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM withdrawals w
      WHERE w.id = withdrawal_id
      AND w.username = auth.uid()::text
    )
  );

CREATE POLICY "Users can create withdrawals with valid balance"
  ON withdrawals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid()::text = username
    AND EXISTS (
      SELECT 1 FROM users
      WHERE username = auth.uid()::text
      AND balance >= amount
    )
  );

CREATE POLICY "Users can view own withdrawals"
  ON withdrawals
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = username);

-- Create indexes
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_withdrawals_username ON withdrawals(username);
CREATE INDEX idx_withdrawal_logs_withdrawal_id ON withdrawal_logs(withdrawal_id);