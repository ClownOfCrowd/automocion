import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { XMarkIcon } from '@heroicons/react/24/outline'

const WhatsAppButton = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  // Показываем кнопку только после скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !hasBeenClosed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasBeenClosed])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setHasBeenClosed(true)
  }

  const handleClick = () => {
    // В реальном приложении здесь будет настоящий номер WhatsApp
    window.open('https://wa.me/34671332591', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative group">
            {/* Кнопка закрытия */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleClose}
              className="absolute -top-2 -right-2 bg-white dark:bg-premium-black rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-premium-black/80 transition-colors z-10"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500 dark:text-white" />
            </motion.button>

            {/* Основная кнопка WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-premium-gold shadow-lg hover:bg-premium-gold/90 transition-all duration-300"
            >
              {/* Пульсирующие круги */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(214,168,107,0.4) 0%, rgba(214,168,107,0) 70%)'
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.3
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(214,168,107,0.3) 0%, rgba(214,168,107,0) 70%)'
                }}
              />

              {/* Иконка WhatsApp с анимацией */}
              <motion.svg
                className="w-8 h-8 text-white relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </motion.svg>
            </motion.button>

            {/* Всплывающая подсказка */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-premium-black px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
                >
                  <div className="text-sm font-medium text-premium-black dark:text-white">
                    {t('whatsapp.message')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-premium-silver">
                    {t('whatsapp.available')}
                  </div>
                  {/* Стрелка */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rotate-45 w-2 h-2 bg-white dark:bg-premium-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppButton 