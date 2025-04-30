import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Список поддерживаемых языков
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ]
  
  // Находим текущий язык
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  // Закрыть выпадающий список при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Меняем язык и перенаправляем на соответствующий URL
  const changeLanguage = (languageCode: string) => {
    // Получаем путь без языкового префикса
    const pathWithoutLanguage = getCurrentPathWithoutLanguage()
    
    // Формируем новый путь с выбранным языком
    const newPath = languageCode === 'es' 
      ? pathWithoutLanguage 
      : `/${languageCode}${pathWithoutLanguage}`
    
    // Меняем язык в i18n
    i18n.changeLanguage(languageCode)
    
    // Перенаправляем на новый URL
    navigate(newPath)
    
    // Закрываем выпадающий список
    setIsOpen(false)
  }
  
  // Получаем текущий путь без языкового префикса
  const getCurrentPathWithoutLanguage = (): string => {
    const { pathname } = location
    const supportedLanguages = ['en', 'ru', 'de', 'fr']
    
    for (const lang of supportedLanguages) {
      if (pathname.startsWith(`/${lang}/`)) {
        return pathname.substring(lang.length + 1)
      }
      if (pathname === `/${lang}`) {
        return '/'
      }
    }
    
    return pathname
  }
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-premium-black dark:text-white hover:text-premium-gold dark:hover:text-premium-gold transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-premium-black/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50 bg-white dark:bg-premium-black"
          >
            <div className="py-1 divide-y divide-gray-100 dark:divide-gray-800">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`group flex w-full items-center px-4 py-2 text-sm transition-colors ${
                    currentLanguage.code === language.code 
                      ? 'bg-premium-gold/10 text-premium-gold font-medium' 
                      : 'text-premium-black dark:text-white hover:bg-premium-gold/5 hover:text-premium-gold dark:hover:text-premium-gold'
                  }`}
                  role="menuitem"
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
