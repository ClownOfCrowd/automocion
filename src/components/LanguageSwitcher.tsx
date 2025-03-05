import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language || 'es')

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-premium-gold transition-colors">
        <span>{languages.find(lang => lang.code === currentLang)?.name}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-premium-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`${
                    active
                      ? 'bg-premium-gold/10 text-premium-gold'
                      : 'text-gray-900 dark:text-white'
                  } ${
                    currentLang === lang.code ? 'bg-premium-gold/5' : ''
                  } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                >
                  {lang.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default LanguageSwitcher
