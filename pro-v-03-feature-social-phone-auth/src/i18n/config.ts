import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ukTranslation from '../locales/uk/translation.json';
import enTranslation from '../locales/en/translation.json';
import roTranslation from '../locales/ro/translation.json';
import ruTranslation from '../locales/ru/translation.json';

const resources = {
  uk: {
    translation: ukTranslation
  },
  en: {
    translation: enTranslation
  },
  ro: {
    translation: roTranslation
  },
  ru: {
    translation: ruTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    supportedLngs: ['uk', 'en', 'ro', 'ru'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already prevents XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
