import { withdrawalService } from '../../db/services/withdrawalService.js';

export const withdrawalController = {
    async getAllWithdrawals(req, res) {
        const withdrawals = await withdrawalService.getAllWithdrawals();
        res.json(withdrawals);
    },

    async getUserWithdrawals(req, res) {
        const withdrawals = await withdrawalService.getUserWithdrawals(req.params.username);
        res.json(withdrawals);
    },

    async createWithdrawal(req, res) {
        const withdrawal = await withdrawalService.createWithdrawal(req.body);
        res.status(201).json(withdrawal);
    }
};