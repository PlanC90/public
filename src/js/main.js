import { setupLanguageSelector } from './language.js';
import { setupWalletValidation } from './wallet.js';
import { setupButtons } from './buttons.js';
import { addIcons } from './icons.js';

function initializeApp() {
  setupLanguageSelector();
  setupWalletValidation();
  setupButtons();
  addIcons();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);