import { setupCountdown } from './countdown.js';
import { setupLanguageSelector } from './language.js';
import { setupWalletValidation } from './wallet.js';
import { setupButtons } from './buttons.js';
import { addIcons } from './icons.js';

async function initializeApp() {
  try {
    // Setup language selector first
    const { updateLanguage } = await setupLanguageSelector();
    
    // Setup other features after language is loaded
    setupWalletValidation();
    setupButtons();
    addIcons();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);