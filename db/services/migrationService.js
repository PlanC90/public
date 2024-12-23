import { getDb } from '../config.js';
import { readJsonFile } from '../utils/fileOperations.js';

export const migrationService = {
  async migrateData() {
    const db = await getDb();
    
    try {
      // Start transaction
      await db.run('BEGIN TRANSACTION');

      // Migrate users
      const users = await readJsonFile('users.json');
      for (const user of users) {
        await db.run(
          `INSERT OR IGNORE INTO users (
            username, balance, tasks_completed, referral_earnings,
            total_referrals, last_login
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            user.username,
            user.balance,
            JSON.stringify(user.tasks_completed || []),
            user.referral_earnings || 0,
            user.total_referrals || 0,
            user.last_login
          ]
        );
      }

      // Migrate withdrawals
      const withdrawals = await readJsonFile('withdrawals.json');
      for (const withdrawal of withdrawals) {
        await db.run(
          `INSERT OR IGNORE INTO withdrawals (
            username, wallet_address, amount, timestamp
          ) VALUES (?, ?, ?, ?)`,
          [
            withdrawal.username,
            withdrawal.walletAddress,
            withdrawal.amount,
            withdrawal.timestamp
          ]
        );
      }

      // Commit transaction
      await db.run('COMMIT');
      console.log('Data migration completed successfully');
    } catch (error) {
      // Rollback on error
      await db.run('ROLLBACK');
      console.error('Migration error:', error);
      throw error;
    }
  }
};