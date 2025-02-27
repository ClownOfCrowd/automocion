import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-1 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
      aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
    >
      <div className="flex items-center justify-between w-14 h-7 px-1">
        <SunIcon className="h-4 w-4 text-yellow-500" />
        <MoonIcon className="h-4 w-4 text-indigo-300" />
        
        <motion.div 
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md"
          animate={{ 
            x: theme === 'dark' ? 28 : 2
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
        />
      </div>
    </motion.button>
  )
}

export default ThemeToggle 