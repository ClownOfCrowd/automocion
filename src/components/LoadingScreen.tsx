import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface LoadingScreenProps {
  isLoading: boolean
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const { theme } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 ${
        !isLoading && 'pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm mx-auto px-4 sm:px-0">
        {/* Название компании с эффектом появления букв */}
        <div className="overflow-hidden mb-12">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Каждая буква анимируется отдельно */}
            {"Automoción".split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                style={{
                  color: i < 4 ? (theme === 'dark' ? '#ffffff' : '#1a1a1a') : (theme === 'dark' ? '#cccccc' : '#4a4a4a'),
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Улучшенное анимированное колесо */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
          {/* Внешняя шина с текстурой */}
          <motion.div
            className="absolute inset-0"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-[16px] sm:border-[20px] md:border-[24px] rounded-full"
                 style={{
                   background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                   boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.2)'
                 }}
            />
            
            {/* Протектор шины */}
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 sm:w-1.5 md:w-2 bg-gray-800"
                style={{
                  height: '8px',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 15}deg) translateX(calc(-50% + var(--wheel-size)/2))`,
                  transformOrigin: '0 50%',
                  '--wheel-size': 'calc(100% - 2px)'
                } as any}
              />
            ))}
          </motion.div>
          
          {/* Диск */}
          <motion.div
            className="absolute inset-[15%]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'linear-gradient(135deg, #e2e2e2, #f5f5f5)',
              borderRadius: '50%',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* Спицы */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${i * 72}deg)`,
                  clipPath: 'polygon(48% 0, 52% 0, 52% 100%, 48% 100%)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                     style={{ boxShadow: '2px 0 4px rgba(0,0,0,0.1)' }} />
              </motion.div>
            ))}
            
            {/* Центр колеса */}
            <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-gray-300 to-gray-400"
                 style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.2)' }}>
              <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
            </div>
          </motion.div>

          {/* Блики */}
          <div className="absolute inset-0 rounded-full"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
               }} />
        </div>

        {/* Индикатор загрузки */}
        <motion.div 
          className="mt-8 flex items-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-800 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen 