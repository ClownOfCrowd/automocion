import { motion } from 'framer-motion'

interface PaymentBadgesProps {
  className?: string
  variant?: 'default' | 'compact'
}

const PaymentBadges = ({ className = '', variant = 'default' }: PaymentBadgesProps) => {
  const badges = [
    {
      name: 'Visa',
      icon: '/payments/visa.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Mastercard',
      icon: '/payments/mastercard.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Apple Pay',
      icon: '/payments/apple-pay.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Google Pay',
      icon: '/payments/google-pay.svg',
      color:'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Union Pay',
      icon: '/payments/union-pay.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Discover',
      icon: '/payments/discover.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Maestro',
      icon: '/payments/maestro.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Diners Club',
      icon: '/payments/diners-club.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'JCB',
      icon: '/payments/jcb.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'V Pay',
      icon: '/payments/v-pay.svg',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ]

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {badges.map((badge) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className={`${badge.color} ${
            variant === 'compact' ? 'p-2' : 'px-4 py-2'
          } rounded-lg shadow-sm flex items-center justify-center`}
        >
          <img
            src={badge.icon}
            alt={badge.name}
            className={variant === 'compact' ? 'h-6' : 'h-8'}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PaymentBadges 