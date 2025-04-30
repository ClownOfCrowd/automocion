import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const CookieConsent = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  // Принять все cookies
  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all')
    localStorage.setItem('analyticsConsent', 'true')
    localStorage.setItem('preferencesConsent', 'true')
    setIsVisible(false)
  }

  // Принять только необходимые cookies
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'essential')
    localStorage.setItem('analyticsConsent', 'false')
    localStorage.setItem('preferencesConsent', 'false')
    setIsVisible(false)
  }

  // Переключение детального просмотра настроек
  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-premium-silver text-sm sm:text-base">
                    {t('cookies.message', 'Este sitio web utiliza cookies para mejorar su experiencia. Puede elegir qué cookies permitir.')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReject}
                    className="px-4 py-2 border border-premium-gold/30 text-premium-silver rounded-md hover:bg-premium-black/50 transition-colors duration-300 text-sm font-medium"
                  >
                    {t('cookies.reject', 'Rechazar')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-premium-gold text-white rounded-md hover:bg-premium-gold/90 transition-colors duration-300 text-sm font-medium"
                  >
                    {t('cookies.accept', 'Aceptar todo')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDetails}
                    className="px-4 py-2 border border-premium-gold/30 text-premium-gold rounded-md hover:bg-premium-gold/10 transition-colors duration-300 text-sm font-medium"
                  >
                    {t('cookies.details', 'Detalles')}
                  </motion.button>
                </div>
              </div>
              
              {/* Детальная информация о cookies с возможностью настройки */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-premium-gold/10 pt-4 overflow-hidden"
                  >
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="border border-premium-gold/10 rounded-md p-4">
                        <h4 className="font-medium text-premium-gold mb-2">{t('cookies.essential.title', 'Cookies Esenciales')}</h4>
                        <p className="text-premium-silver mb-2">{t('cookies.essential.description', 'Necesarios para el funcionamiento básico del sitio. Siempre activos.')}</p>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked 
                            disabled 
                            className="h-4 w-4 text-premium-gold border-premium-gold/30 rounded" 
                          />
                          <span className="ml-2 text-premium-silver">{t('cookies.alwaysActive', 'Siempre activo')}</span>
                        </div>
                      </div>
                      
                      <div className="border border-premium-gold/10 rounded-md p-4">
                        <h4 className="font-medium text-premium-gold mb-2">{t('cookies.analytics.title', 'Cookies Analíticas')}</h4>
                        <p className="text-premium-silver mb-2">{t('cookies.analytics.description', 'Nos ayudan a mejorar nuestro sitio mediante estadísticas de uso.')}</p>
                        <div className="flex items-center">
                          <button
                            onClick={() => localStorage.setItem('analyticsConsent', 'false')}
                            className="px-2 py-1 text-xs border border-premium-gold/30 text-premium-silver rounded-md hover:bg-premium-black/50 mr-2"
                          >
                            {t('cookies.reject', 'Rechazar')}
                          </button>
                          <button
                            onClick={() => localStorage.setItem('analyticsConsent', 'true')}
                            className="px-2 py-1 text-xs bg-premium-gold text-white rounded-md hover:bg-premium-gold/90"
                          >
                            {t('cookies.accept', 'Aceptar')}
                          </button>
                        </div>
                      </div>
                      
                      <div className="border border-premium-gold/10 rounded-md p-4">
                        <h4 className="font-medium text-premium-gold mb-2">{t('cookies.preferences.title', 'Cookies de Preferencias')}</h4>
                        <p className="text-premium-silver mb-2">{t('cookies.preferences.description', 'Guardan sus preferencias como el idioma y tema oscuro.')}</p>
                        <div className="flex items-center">
                          <button
                            onClick={() => localStorage.setItem('preferencesConsent', 'false')}
                            className="px-2 py-1 text-xs border border-premium-gold/30 text-premium-silver rounded-md hover:bg-premium-black/50 mr-2"
                          >
                            {t('cookies.reject', 'Rechazar')}
                          </button>
                          <button
                            onClick={() => localStorage.setItem('preferencesConsent', 'true')}
                            className="px-2 py-1 text-xs bg-premium-gold text-white rounded-md hover:bg-premium-gold/90"
                          >
                            {t('cookies.accept', 'Aceptar')}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/privacy"
                        className="px-4 py-2 border border-premium-gold/30 text-premium-gold rounded-md hover:bg-premium-gold/10 transition-colors duration-300 text-sm font-medium"
                      >
                        {t('cookies.learnMore', 'Más información')}
                      </motion.a>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAcceptAll}
                        className="px-4 py-2 bg-premium-gold text-white rounded-md hover:bg-premium-gold/90 transition-colors duration-300 text-sm font-medium"
                      >
                        {t('cookies.saveSettings', 'Guardar ajustes')}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent 