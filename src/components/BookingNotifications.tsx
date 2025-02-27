import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cars } from '../data/cars'

// Расширенные списки имен для каждого языка
const namesByLang = {
  es: [
    'María', 'Juan', 'Carmen', 'Antonio', 'Isabel', 'Pablo', 'Ana', 'José',
    'Laura', 'Carlos', 'Sofia', 'Diego', 'Lucía', 'Miguel', 'Elena', 'David',
    'Marta', 'Javier', 'Paula', 'Alberto', 'Rosa', 'Fernando', 'Cristina', 'Manuel',
    'Beatriz', 'Ricardo', 'Victoria', 'Alejandro', 'Patricia', 'Francisco'
  ],
  en: [
    'Sarah', 'Michael', 'Emma', 'James', 'Olivia', 'William', 'Sophia', 'John',
    'Isabella', 'David', 'Charlotte', 'Daniel', 'Ava', 'Joseph', 'Mia', 'Thomas',
    'Emily', 'Alexander', 'Elizabeth', 'Henry', 'Grace', 'Benjamin', 'Victoria',
    'Christopher', 'Amelia', 'Andrew', 'Natalie', 'Matthew', 'Sophie', 'Ryan'
  ],
  de: [
    'Anna', 'Thomas', 'Laura', 'Markus', 'Sophie', 'Felix', 'Julia', 'Lukas',
    'Lena', 'Paul', 'Hannah', 'Jonas', 'Lisa', 'David', 'Marie', 'Maximilian',
    'Sarah', 'Tim', 'Katharina', 'Sebastian', 'Emma', 'Philipp', 'Lea', 'Simon',
    'Clara', 'Alexander', 'Nina', 'Christian', 'Jana', 'Michael'
  ],
  ru: [
    'Анна', 'Михаил', 'София', 'Александр', 'Мария', 'Дмитрий', 'Елена', 'Сергей',
    'Татьяна', 'Андрей', 'Ольга', 'Иван', 'Екатерина', 'Павел', 'Наталья', 'Артём',
    'Юлия', 'Максим', 'Алиса', 'Владимир', 'Ирина', 'Николай', 'Дарья', 'Антон',
    'Виктория', 'Роман', 'Ксения', 'Евгений', 'Полина', 'Игорь'
  ],
  fr: [
    'Sophie', 'Thomas', 'Camille', 'Nicolas', 'Emma', 'Lucas', 'Léa', 'Hugo',
    'Chloé', 'Julien', 'Manon', 'Antoine', 'Inès', 'Louis', 'Jade', 'Maxime',
    'Clara', 'Pierre', 'Juliette', 'Alexandre', 'Alice', 'Gabriel', 'Louise',
    'Théo', 'Sarah', 'Paul', 'Charlotte', 'Arthur', 'Zoé', 'Victor'
  ]
}

const BookingNotifications = () => {
  const { t, i18n } = useTranslation()
  const [notification, setNotification] = useState<{ name: string; carId: number; timeAgo: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Функция для генерации случайного уведомления
  const generateRandomNotification = () => {
    const names = namesByLang[i18n.language as keyof typeof namesByLang] || namesByLang.es
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomCar = cars[Math.floor(Math.random() * cars.length)]
    const timeAgo = Math.floor(Math.random() * 30) + 1 // Случайное время от 1 до 30 минут назад

    return {
      name: randomName,
      carId: randomCar.id,
      timeAgo
    }
  }

  useEffect(() => {
    // Показываем уведомление каждые 90-120 секунд (случайный интервал)
    const getRandomInterval = () => Math.floor(Math.random() * 30000) + 90000 // от 90 до 120 секунд

    const showInterval = setInterval(() => {
      const newNotification = generateRandomNotification()
      setNotification(newNotification)
      setIsVisible(true)

      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }, getRandomInterval())

    // Показываем первое уведомление через 30 секунд после загрузки
    const initialTimeout = setTimeout(() => {
      const initialNotification = generateRandomNotification()
      setNotification(initialNotification)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }, 30000)

    return () => {
      clearInterval(showInterval)
      clearTimeout(initialTimeout)
    }
  }, [i18n.language])

  if (!notification) return null

  const car = cars.find(c => c.id === notification.carId)
  if (!car) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 z-40 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={car.image}
                alt={car.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('notifications.booked', {
                  car: car.name,
                  time: notification.timeAgo
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingNotifications 