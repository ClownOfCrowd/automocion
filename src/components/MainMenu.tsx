import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

const MainMenu: React.FC<MainMenuProps> = ({ isMenuOpen, setMenuOpen }) => {
  const { t, i18n } = useTranslation()
  const [isLocaleMenuOpen, setLocaleMenuOpen] = useState(false)
  const { currentTheme, toggleTheme } = useTheme()
  
  const toggleLocaleMenu = () => {
    setLocaleMenuOpen((prev) => !prev)
  }

  const menuItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.catalog'), path: '/catalog' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.terms'), path: '/terms' }
  ]

  return (
    <div>
      {/* Render your menu items here */}
    </div>
  )
}

export default MainMenu 