import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'
import CartDrawer from './CartDrawer'
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
  const { items, isCartOpen, openCart, closeCart } = useCart()

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
      isScrolled ? 'bg-white dark:bg-premium-black shadow-lg' : 'bg-transparent'
    }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <span className={`text-2xl font-bold ${
                  isScrolled ? 'text-premium-black dark:text-white' : 'text-white'
                }`}>
                  <span className="text-premium-gold">O.V.</span> Automoción
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'text-premium-gold'
                        : isScrolled
                          ? 'text-gray-900 dark:text-white hover:text-premium-gold'
                          : 'text-white hover:text-premium-gold'
                    } transition-colors duration-300`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <ThemeToggle />
                <LanguageSwitcher />
                
                {/* Mobile menu button */}
                <Disclosure.Button className="md:hidden inline-flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-premium-gold">
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
                      : 'text-gray-900 dark:text-white hover:bg-premium-gold/10 hover:text-premium-gold'
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