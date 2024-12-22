const CONFIG = require('../constants/config');

function validateWithdrawal(amount, walletAddress) {
    if (!amount || amount < CONFIG.WITHDRAWAL_MIN) {
        throw new Error(`Minimum withdrawal amount is ${CONFIG.WITHDRAWAL_MIN}`);
    }

    if (!walletAddress || typeof walletAddress !== 'string') {
        throw new Error('Wallet address is required');
    }

    if (!walletAddress.startsWith('x')) {
        throw new Error('Invalid XEP wallet address. Address must start with "x"');
    }

    if (walletAddress.length < CONFIG.WALLET_ADDRESS_MIN_LENGTH || 
        walletAddress.length > CONFIG.WALLET_ADDRESS_MAX_LENGTH) {
        throw new Error('Invalid wallet address length');
    }
}

module.exports = {
    validateWithdrawal
};