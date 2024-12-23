import { getDb } from '../config.js';

export const withdrawalRepository = {
  async create(withdrawalData) {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
       VALUES (?, ?, ?, ?)`,
      [
        withdrawalData.username,
        withdrawalData.wallet_address,
        withdrawalData.amount,
        withdrawalData.timestamp || new Date().toISOString()
      ]
    );
    return result;
  },

  async findByUsername(username) {
    const db = await getDb();
    return await db.all(
      'SELECT * FROM withdrawals WHERE username = ? ORDER BY timestamp DESC',
      username
    );
  },

  async getAll() {
    const db = await getDb();
    return await db.all('SELECT * FROM withdrawals ORDER BY timestamp DESC');
  }
};