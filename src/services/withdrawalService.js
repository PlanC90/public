const { validateWithdrawal } = require('../utils/validators');
const { withdrawalRepository } = require('../repositories/withdrawalRepository');
const { telegramService } = require('./telegramService');

const withdrawalService = {
    async createWithdrawal(withdrawalData) {
        // Validate withdrawal amount
        validateWithdrawal(withdrawalData.amount, withdrawalData.wallet_address);

        // Validate OmniXEP wallet address
        if (!withdrawalData.wallet_address.startsWith('x')) {
            throw new Error('Invalid OmniXEP wallet address. Address must start with "x"');
        }

        // Save to database
        const withdrawal = await withdrawalRepository.create({
            username: withdrawalData.username,
            wallet_address: withdrawalData.wallet_address,
            amount: withdrawalData.amount,
            timestamp: new Date().toISOString()
        });
        
        // Notify admins
        await telegramService.notifyWithdrawal(
            withdrawalData.username,
            withdrawalData.amount,
            withdrawalData.wallet_address
        );

        return withdrawal;
    },

    async getUserWithdrawals(username) {
        return await withdrawalRepository.findByUsername(username);
    },

    async getAllWithdrawals() {
        const withdrawals = await withdrawalRepository.getAll();
        return withdrawals.map(w => ({
            ...w,
            isValid: w.wallet_address.startsWith('x')
        }));
    }
};

module.exports = { withdrawalService };