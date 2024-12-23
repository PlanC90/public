const CONFIG = require('../constants/config');

function validateWithdrawal(amount, walletAddress) {
    if (!amount || amount <= 0) {
        throw new Error('Invalid withdrawal amount');
    }

    if (!walletAddress) {
        throw new Error('Wallet address is required');
    }

    if (typeof walletAddress !== 'string') {
        throw new Error('Invalid wallet address format');
    }

    if (!walletAddress.startsWith('x')) {
        throw new Error('Invalid XEP wallet address. Address must start with "x"');
    }

    if (walletAddress.length < CONFIG.WALLET_ADDRESS_MIN_LENGTH || 
        walletAddress.length > CONFIG.WALLET_ADDRESS_MAX_LENGTH) {
        throw new Error('Invalid wallet address length');
    }
}

function validateUsername(username) {
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        throw new Error('Username is required');
    }
}

module.exports = {
    validateWithdrawal,
    validateUsername
};