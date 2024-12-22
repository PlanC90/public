import { db } from '../config.js';

export const UserModel = {
  async findByUsername(username) {
    return await db.findUser(username);
  },

  async create(userData) {
    const users = await db.readJsonFile('users.json');
    const newUser = {
      username: userData.username,
      balance: userData.balance || 500000,
      tasks_completed: [],
      last_login: new Date().toISOString()
    };
    users.push(newUser);
    await db.writeJsonFile('users.json', users);
    return newUser;
  },

  async updateBalance(username, balance) {
    return await db.updateUser(username, { balance });
  },

  async updateTasks(username, tasks) {
    return await db.updateUser(username, { tasks_completed: tasks });
  }
};