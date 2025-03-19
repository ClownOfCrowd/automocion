import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const CookieConsent = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-premium-black to-premium-black/90 border-t border-premium-gold/20 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-premium-silver text-sm sm:text-base">
                  {t('cookies.message', 'Este sitio web utiliza cookies para mejorar su experiencia. Al continuar navegando, acepta nuestra política de cookies.')}
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="px-6 py-2 bg-premium-gold text-white rounded-md hover:bg-premium-gold/90 transition-colors duration-300 text-sm font-medium"
                >
                  {t('cookies.accept', 'Aceptar')}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/privacy"
                  className="px-6 py-2 border border-premium-gold/30 text-premium-gold rounded-md hover:bg-premium-gold/10 transition-colors duration-300 text-sm font-medium"
                >
                  {t('cookies.learnMore', 'Más información')}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent 