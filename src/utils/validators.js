const { WITHDRAWAL_MIN } = require('../constants/config');

function validateWithdrawal(amount, walletAddress) {
    if (!amount || amount < WITHDRAWAL_MIN) {
        throw new Error(`Minimum withdrawal amount is ${WITHDRAWAL_MIN}`);
    }

    if (!walletAddress || typeof walletAddress !== 'string') {
        throw new Error('Wallet address is required');
    }

    // Validate OmniXEP address format
    if (!walletAddress.startsWith('x')) {
        throw new Error('Invalid OmniXEP wallet address. Address must start with "x"');
    }

    // Additional OmniXEP address validation
    if (walletAddress.length < 25 || walletAddress.length > 35) {
        throw new Error('Invalid OmniXEP wallet address length');
    }
}

module.exports = {
    validateWithdrawal
};