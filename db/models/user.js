import { dbAsync } from '../config.js';

export const UserModel = {
  async findByUsername(username) {
    return await dbAsync.get(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
  },

  async create(userData) {
    return await dbAsync.run(
      `INSERT INTO users (username, balance, tasks_completed, last_login)
       VALUES (?, ?, ?, ?)`,
      [
        userData.username,
        userData.balance || 500000,
        JSON.stringify([]),
        new Date().toISOString()
      ]
    );
  },

  async updateBalance(username, balance) {
    return await dbAsync.run(
      'UPDATE users SET balance = ? WHERE username = ?',
      [balance, username]
    );
  },

  async updateTasks(username, tasks) {
    return await dbAsync.run(
      'UPDATE users SET tasks_completed = ? WHERE username = ?',
      [JSON.stringify(tasks), username]
    );
  }
};