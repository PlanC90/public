// Available languages configuration
export const AVAILABLE_LANGUAGES = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español',
  zh: '中文',
  fr: 'Français'
};

// Get browser language or default to English
export function getDefaultLanguage() {
  const browserLang = navigator.language.split('-')[0];
  return AVAILABLE_LANGUAGES[browserLang] ? browserLang : 'en';
}

// Save language preference to localStorage
export function saveLanguagePreference(lang) {
  localStorage.setItem('preferred-language', lang);
}

// Get saved language preference or default
export function getLanguagePreference() {
  return localStorage.getItem('preferred-language') || getDefaultLanguage();
}