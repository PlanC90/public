export function validateWithdrawal(amount, walletAddress) {
  if (!amount || amount <= 0) {
    throw new Error('Invalid withdrawal amount');
  }
  
  if (!walletAddress?.startsWith('x')) {
    throw new Error('Invalid wallet address format');
  }
}

export function validateUser(username) {
  if (!username?.trim()) {
    throw new Error('Username is required');
  }
}