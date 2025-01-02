import { saveClaimData } from '../utils/claimStorage.js';

export function setupClaimHandler() {
  const claimButton = document.getElementById('claimButton');
  const walletInput = document.getElementById('wallet');

  claimButton.addEventListener('click', () => {
    const walletAddress = walletInput.value;
    if (walletAddress && walletAddress.startsWith('x')) {
      const success = saveClaimData(walletAddress);
      if (success) {
        alert('Claim successful! You will receive your tokens within 30 days.');
      } else {
        alert('Error processing claim. Please try again.');
      }
    }
  });
}