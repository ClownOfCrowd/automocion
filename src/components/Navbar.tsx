import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { motion } from 'framer-motion'

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

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.terms'), href: '/terms' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-50 dark:bg-premium-gradient-1 shadow-md' 
        : 'bg-gray-50/90 backdrop-blur-md dark:bg-premium-black/90 dark:backdrop-blur-md'
    }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-premium-black dark:text-white">
                    O.V. <span className="text-premium-gold">Automoción</span>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        location.pathname === item.href
                          ? 'text-premium-gold border-b-2 border-premium-gold'
                          : 'text-premium-black dark:text-white hover:text-premium-gold border-b-2 border-transparent hover:border-premium-gold'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <ThemeToggle />
                <LanguageSwitcher />
                
                {/* Mobile menu button */}
                <Disclosure.Button className="md:hidden inline-flex items-center justify-center rounded-md p-3 text-premium-black dark:text-white hover:bg-gray-100 dark:hover:bg-premium-black/50 hover:text-premium-gold dark:hover:text-premium-gold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-premium-gold">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 px-2 pb-3 pt-2 bg-white dark:bg-premium-black shadow-lg"
            >
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-premium-gold text-white'
                      : 'text-premium-black dark:text-white hover:bg-premium-gold/10 hover:text-premium-gold'
                  } block rounded-md px-4 py-3 text-base font-medium w-full text-left`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </motion.div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar 