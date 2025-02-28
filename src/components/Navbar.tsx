import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'
import CartDrawer from './CartDrawer'
import ThemeToggle from './ThemeToggle'

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'fr', name: 'Français' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language || 'es')
  const { items, isCartOpen, openCart, closeCart } = useCart()

  const navigation = [
    { name: t('nav.home'), href: '/', current: true },
    { name: t('nav.catalog'), href: '/catalog', current: false },
    { name: t('nav.contact'), href: '/contact', current: false },
  ]

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      Automoción
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'border-indigo-500 text-gray-900 dark:text-white'
                            : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-300'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                  <ThemeToggle />
                  
                  <button
                    onClick={openCart}
                    className="relative p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                        {items.length}
                      </span>
                    )}
                  </button>

                  <select
                    value={currentLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="rounded-md border-gray-300 dark:border-gray-600 py-1.5 text-gray-900 dark:text-white dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-300"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-white transition-colors duration-300">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-200'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors duration-300'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                      <ThemeToggle />
                      <button
                        onClick={openCart}
                        className="relative flex items-center space-x-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                        <span className="text-sm font-medium">{t('nav.cart')}</span>
                        {items.length > 0 && (
                          <span className="absolute -top-1 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform -translate-y-1/2 bg-indigo-600 rounded-full">
                            {items.length}
                          </span>
                        )}
                      </button>
                    </div>
                    <select
                      value={currentLang}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="mt-1 block w-48 rounded-md border-gray-300 dark:border-gray-600 py-2 pl-3 pr-10 text-base dark:text-white dark:bg-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-colors duration-300"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
} 