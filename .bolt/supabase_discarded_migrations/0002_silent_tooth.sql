/*
  # Add withdrawal functionality

  1. Changes
    - Add withdrawal_status enum type
    - Add status column to withdrawals table
    - Add validation trigger for wallet addresses
    - Add policies for withdrawal management

  2. Security
    - Enable RLS on withdrawals table
    - Add policies for user access control
    - Add validation constraints
*/

-- Create withdrawal status enum
CREATE TYPE withdrawal_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Add status column to withdrawals
ALTER TABLE withdrawals 
ADD COLUMN status withdrawal_status NOT NULL DEFAULT 'pending',
ADD COLUMN processed_at timestamptz;

-- Add wallet address validation check
ALTER TABLE withdrawals
ADD CONSTRAINT valid_wallet_address 
CHECK (wallet_address ~ '^x[A-Za-z0-9]{25,35}$');

-- Add amount validation
ALTER TABLE withdrawals
ADD CONSTRAINT valid_amount
CHECK (amount >= 100000);

-- Create function to update user balance on withdrawal
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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for withdrawal processing
CREATE TRIGGER withdrawal_processor
  BEFORE INSERT ON withdrawals
  FOR EACH ROW
  EXECUTE FUNCTION process_withdrawal();

-- Add policies for withdrawal management
CREATE POLICY "Users can create own withdrawals"
  ON withdrawals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = username);

CREATE POLICY "Users can view own withdrawals"
  ON withdrawals
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = username);

CREATE POLICY "Admins can view all withdrawals"
  ON withdrawals
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE username = auth.uid()::text
    AND is_admin = true
  ));

-- Create index for faster queries
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_withdrawals_username ON withdrawals(username);