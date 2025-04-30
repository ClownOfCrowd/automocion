import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  title: string;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Список поддерживаемых языков с локализованными названиями
  const languages: LanguageOption[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸', title: 'Cambiar a Español' },
    { code: 'en', name: 'English', flag: '🇬🇧', title: 'Switch to English' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', title: 'Passer au Français' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', title: 'Zu Deutsch wechseln' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', title: 'Переключиться на русский' }
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
  
  // Обработка клавиш для доступности
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault()
      const firstItem = document.querySelector('[role="menuitem"]') as HTMLElement
      if (firstItem) firstItem.focus()
    }
  }
  
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
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-premium-steel-light hover:text-premium-red transition-colors rounded-full hover:bg-premium-black/50"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${currentLanguage.name} - Cambiar idioma`}
        title={`${currentLanguage.name} - Cambiar idioma`}
      >
        <span className="mr-1" aria-hidden="true">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-white/10 focus:outline-none z-50 bg-premium-black"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu-button"
          >
            <div className="py-1 divide-y divide-gray-800">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`group flex w-full items-center px-4 py-2 text-sm transition-colors ${
                    currentLanguage.code === language.code 
                      ? 'bg-premium-red/10 text-premium-red font-medium' 
                      : 'text-premium-steel-light hover:bg-premium-red/5 hover:text-premium-red'
                  }`}
                  role="menuitem"
                  lang={language.code}
                  title={language.title}
                  aria-current={currentLanguage.code === language.code ? 'true' : undefined}
                >
                  <span className="mr-2" aria-hidden="true">{language.flag}</span>
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
