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
    return { id: result.lastID, ...userData };
  },

  async update(username, data) {
    const db = await getDb();
    await db.run(
      `UPDATE users 
       SET balance = COALESCE(?, balance),
           tasks_completed = COALESCE(?, tasks_completed),
           last_login = COALESCE(?, last_login)
       WHERE username = ?`,
      [
        data.balance,
        data.tasks_completed ? JSON.stringify(data.tasks_completed) : undefined,
        new Date().toISOString(),
        username
      ]
    );
    return this.findByUsername(username);
  }
};