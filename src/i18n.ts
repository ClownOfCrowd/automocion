import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Импортируем переводы
import translationES from './locales/es/translation.json'
import translationEN from './locales/en/translation.json'
import translationDE from './locales/de/translation.json'
import translationRU from './locales/ru/translation.json'
import translationFR from './locales/fr/translation.json'

// Получаем сохраненный язык из localStorage или используем испанский по умолчанию
const savedLanguage = localStorage.getItem('user-language') || 'es';

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
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Используем сохраненный язык
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  })

// Сохраняем выбранный язык при его изменении
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('user-language', lng);
});

export default i18n 