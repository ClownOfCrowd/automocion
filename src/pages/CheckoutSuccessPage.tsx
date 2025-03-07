import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import PageTransition from '../components/PageTransition'

const CheckoutSuccessPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('checkout.success.title')}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t('checkout.success.message')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 space-y-4"
          >
            <button
              onClick={() => navigate('/catalog')}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-premium-gold hover:bg-premium-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premium-gold"
            >
              {t('checkout.success.backToCatalog')}
            </button>
            
            <button
              onClick={() => navigate('/')}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premium-gold"
            >
              {t('checkout.success.backToHome')}
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default CheckoutSuccessPage 