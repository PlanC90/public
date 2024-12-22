import { withdrawalRepository } from '../repositories/withdrawalRepository.js';

export const withdrawalService = {
  async createWithdrawal(withdrawalData) {
    return await withdrawalRepository.create(withdrawalData);
  },

  async getUserWithdrawals(username) {
    return await withdrawalRepository.findByUsername(username);
  },

  async getAllWithdrawals() {
    return await withdrawalRepository.getAll();
  }
};