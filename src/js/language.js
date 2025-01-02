import { 
  AVAILABLE_LANGUAGES, 
  getLanguagePreference, 
  saveLanguagePreference 
} from './utils/languageUtils.js';
import { translations } from './config/translations.js';

export function setupLanguageSelector() {
  const languageSelector = document.getElementById('languageSelector');
  
  // Populate language options
  Object.entries(AVAILABLE_LANGUAGES).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    languageSelector.appendChild(option);
  });

  // Set initial language
  const savedLanguage = getLanguagePreference();
  languageSelector.value = savedLanguage;
  
  function updateLanguage(lang) {
    const langData = translations[lang];
    if (!langData) return;
    
    const elements = {
      pageTitle: 'title',
      claimButton: 'claimButtonText',
      telegramButton: 'telegramButtonText',
      walletLabel: 'walletLabel',
      walletError: 'walletError',
      telegramText: 'telegramText',
      downloadButton: 'downloadButtonText',
      countdownText: 'countdownText',
      fastestToken: 'fastestToken',
      electraProtocol: 'electraProtocol',
      moreMemeX: 'moreMemeX'
    };

    // Update all elements with translations
    Object.entries(elements).forEach(([elementId, translationKey]) => {
      const element = document.getElementById(elementId);
      if (element) {
        if (translationKey === 'telegramText' || translationKey === 'electraProtocol' || translationKey === 'moreMemeX') {
          element.innerHTML = langData[translationKey];
        } else if (translationKey === 'countdownText') {
          const text = langData[translationKey];
          if (text) {
            element.textContent = text.replace("{countdown}", "30 days");
          }
        } else {
          element.textContent = langData[translationKey];
        }
      }
    });

    // Update links
    const electraProtocol = document.querySelector('#electraProtocol a');
    const moreMemeX = document.querySelector('#moreMemeX a');
    if (electraProtocol) electraProtocol.href = langData.electraLink;
    if (moreMemeX) moreMemeX.href = langData.moreMemeXLink;
  }

  // Add language change listener
  languageSelector.addEventListener('change', (e) => {
    const newLang = e.target.value;
    saveLanguagePreference(newLang);
    updateLanguage(newLang);
  });

  // Initial language update
  updateLanguage(savedLanguage);
  
  return { updateLanguage };
}