const { WITHDRAWAL_MIN } = require('../../db/constants/config');

function validateUsername(username) {
  if (!username?.trim()) {
    throw new Error('Username is required');
  }
  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }
}

function validateWithdrawal(amount, walletAddress) {
  if (!amount || amount < WITHDRAWAL_MIN) {
    throw new Error(`Minimum withdrawal amount is ${WITHDRAWAL_MIN}`);
  }
  
  if (!walletAddress?.startsWith('x')) {
    throw new Error('Invalid XEP wallet address');
  }
}

module.exports = {
  validateUsername,
  validateWithdrawal
};