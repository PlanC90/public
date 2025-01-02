import { setupWalletDownload } from './features/walletDownload.js';
import { setupClaimHandler } from './features/claimHandler.js';

// Button states and actions
export function setupButtons() {
  const claimButton = document.getElementById('claimButton');
  const twitterButton = document.getElementById('telegramButton');
  const downloadButton = document.getElementById('downloadButton');
  const walletInput = document.getElementById('wallet');

  // Initial state
  claimButton.style.backgroundColor = '#808080'; // Grey
  claimButton.disabled = true;

  // Style download button with custom purple color
  downloadButton.style.backgroundColor = 'rgb(99, 19, 197)';
  downloadButton.style.borderRadius = '8px';

  // Twitter button click handler
  twitterButton.addEventListener('click', () => {
    window.open('https://x.com/memexairdrop', '_blank');
  });

  // Wallet input handler
  walletInput.addEventListener('input', (e) => {
    const isValid = e.target.value && e.target.value.startsWith('x') && e.target.value.length > 1;
    if (isValid) {
      claimButton.style.backgroundColor = '#22c55e'; // Green
      claimButton.disabled = false;
    } else {
      claimButton.style.backgroundColor = '#808080'; // Grey
      claimButton.disabled = true;
    }
  });

  // Setup wallet download functionality
  setupWalletDownload();
  
  // Setup claim handler
  setupClaimHandler();
}