import { dbAsync } from '../config.js';

export const WithdrawalModel = {
  async create(withdrawalData) {
    return await dbAsync.run(
      `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
       VALUES (?, ?, ?, ?)`,
      [
        withdrawalData.username,
        withdrawalData.wallet_address,
        withdrawalData.amount,
        withdrawalData.timestamp || new Date().toISOString()
      ]
    );
  },

  async findByUsername(username) {
    return await dbAsync.all(
      'SELECT * FROM withdrawals WHERE username = ?',
      [username]
    );
  },

  async getAll() {
    return await dbAsync.all(
      'SELECT * FROM withdrawals ORDER BY timestamp DESC'
    );
  }
};