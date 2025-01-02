export async function setupLanguageSelector() {
  try {
    const response = await fetch('/translations.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const languageSelector = document.getElementById('languageSelector');
    
    // Populate language options
    for (const lang in data) {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = lang.toUpperCase();
      languageSelector.appendChild(option);
    }

    // Set default language
    let selectedLanguage = 'en';
    
    // Update UI with selected language
    function updateLanguage(lang) {
      const langData = data[lang];
      if (!langData) return;
      
      document.getElementById('pageTitle').textContent = langData.title;
      document.getElementById('claimButton').textContent = langData.claimButtonText;
      document.getElementById('telegramButton').textContent = langData.telegramButtonText;
      document.getElementById('walletLabel').textContent = langData.walletLabel;
      document.getElementById('walletError').textContent = langData.walletError;
      document.getElementById('telegramText').innerHTML = langData.telegramText;
      document.getElementById('downloadButton').textContent = langData.downloadButtonText;
      document.getElementById('fastestToken').textContent = langData.fastestToken;
    }

    // Add language change listener
    languageSelector.addEventListener('change', (e) => {
      selectedLanguage = e.target.value;
      updateLanguage(selectedLanguage);
    });

    // Initial language update
    updateLanguage(selectedLanguage);
    
    return { updateLanguage };
  } catch (error) {
    console.error('Error loading translations:', error);
    throw error;
  }
}