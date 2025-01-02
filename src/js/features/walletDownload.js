import { detectDevice } from '../utils/deviceDetection.js';
import { WALLET_URLS } from '../utils/walletUrls.js';

export function setupWalletDownload() {
  const downloadButton = document.getElementById('downloadButton');
  
  downloadButton.addEventListener('click', () => {
    const deviceType = detectDevice();
    const downloadUrl = WALLET_URLS[deviceType];
    
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  });
}