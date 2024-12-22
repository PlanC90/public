import { userRepository } from '../repositories/userRepository.js';
import { ServiceError } from './errorHandler.js';
import { validateUser } from '../utils/validation.js';

export const userService = {
  async findByUsername(username) {
    validateUser(username);
    return await userRepository.findByUsername(username);
  },

  async createUser(userData) {
    validateUser(userData.username);
    return await userRepository.create(userData);
  },

  async updateUser(username, data) {
    validateUser(username);
    return await userRepository.update(username, data);
  },

  async getAllUsers() {
    return await userRepository.getAll();
  }
};