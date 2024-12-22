import { getDb } from '../config.js';

export const userRepository = {
  async findByUsername(username) {
    const db = await getDb();
    return await db.get(
      'SELECT * FROM users WHERE username = ?',
      username
    );
  },

  async create(userData) {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO users (username, balance, tasks_completed, last_login)
       VALUES (?, ?, ?, ?)`,
      [
        userData.username,
        userData.balance || 500000,
        JSON.stringify([]),
        new Date().toISOString()
      ]
    );
    return result;
  },

  async update(username, data) {
    const db = await getDb();
    const result = await db.run(
      `UPDATE users SET 
       balance = COALESCE(?, balance),
       tasks_completed = COALESCE(?, tasks_completed),
       referral_earnings = COALESCE(?, referral_earnings),
       total_referrals = COALESCE(?, total_referrals),
       last_login = COALESCE(?, last_login)
       WHERE username = ?`,
      [
        data.balance,
        data.tasks_completed ? JSON.stringify(data.tasks_completed) : undefined,
        data.referral_earnings,
        data.total_referrals,
        data.last_login,
        username
      ]
    );
    return result;
  },

  async getAll() {
    const db = await getDb();
    return await db.all('SELECT * FROM users ORDER BY created_at DESC');
  }
};