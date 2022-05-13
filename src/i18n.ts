import i18n from 'i18next';
import locales from './locales';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  resources: {
    ...locales,
  },
});

console.log('locales', locales);
window.i18n = i18n;
