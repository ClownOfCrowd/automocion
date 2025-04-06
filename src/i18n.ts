import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Импортируем переводы
import translationES from './locales/es/translation.json'
import translationEN from './locales/en/translation.json'
import translationDE from './locales/de/translation.json'
import translationRU from './locales/ru/translation.json'
import translationFR from './locales/fr/translation.json'

// Получаем сохраненный язык из localStorage или используем испанский по умолчанию
const savedLanguage = localStorage.getItem('i18nextLng') || 'es';

const resources = {
  es: {
    translation: translationES,
  },
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  ru: {
    translation: translationRU,
  },
  fr: {
    translation: translationFR,
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'es',
    debug: false,
    supportedLngs: ['es', 'en', 'fr', 'de', 'ru'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    }
  })

// Сохраняем выбранный язык при его изменении
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n; 