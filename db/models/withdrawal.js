import { db } from '../config.js';

export const WithdrawalModel = {
  async create(withdrawalData) {
    return await db.createWithdrawal({
      ...withdrawalData,
      timestamp: withdrawalData.timestamp || new Date().toISOString()
    });
  },

  async findByUsername(username) {
    const withdrawals = await db.getAllWithdrawals();
    return withdrawals.filter(w => w.username === username);
  },

  async getAll() {
    return await db.getAllWithdrawals();
  }
};