import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cars } from '../data/cars'
import { useTheme } from '../contexts/ThemeContext'

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
  const { theme } = useTheme()
  const [notification, setNotification] = useState<{ name: string; carId: string; timeAgo: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Функция для генерации случайного уведомления
  const generateRandomNotification = () => {
    const names = namesByLang[i18n.language as keyof typeof namesByLang] || namesByLang.es
    const randomName = names[Math.floor(Math.random() * names.length)]
    
    // Более реалистичное распределение автомобилей
    // Некоторые модели более популярны и должны появляться чаще
    let randomCar;
    const carRand = Math.random();
    
    // Получаем популярные автомобили (первые 3-5 в списке)
    const popularCars = cars.slice(0, Math.min(5, cars.length));
    // Получаем остальные автомобили
    const otherCars = cars.slice(Math.min(5, cars.length));
    
    if (carRand < 0.6 && popularCars.length > 0) {
      // 60% шанс выбрать из популярных автомобилей
      randomCar = popularCars[Math.floor(Math.random() * popularCars.length)];
    } else {
      // 40% шанс выбрать из остальных автомобилей
      // Если нет разделения на популярные/остальные, выбираем из всего списка
      const carsToChooseFrom = otherCars.length > 0 ? otherCars : cars;
      randomCar = carsToChooseFrom[Math.floor(Math.random() * carsToChooseFrom.length)];
    }
    
    // Более реалистичное распределение времени бронирования
    // Большинство бронирований будут показаны как произошедшие в последние 30 минут,
    // но некоторые могут быть и более давними (до 2 часов)
    let timeAgo;
    const rand = Math.random();
    if (rand < 0.7) {
      // 70% бронирований в последние 30 минут
      timeAgo = Math.floor(Math.random() * 25) + 5; // от 5 до 30 минут
    } else if (rand < 0.9) {
      // 20% бронирований от 30 минут до 1 часа
      timeAgo = Math.floor(Math.random() * 30) + 30; // от 30 до 60 минут
    } else {
      // 10% бронирований от 1 до 2 часов
      timeAgo = Math.floor(Math.random() * 60) + 60; // от 60 до 120 минут
    }

    return {
      name: randomName,
      carId: randomCar.id,
      timeAgo
    }
  }

  useEffect(() => {
    // Показываем уведомление каждые 90-120 секунд (случайный интервал)
    // Это создает ощущение активности на сайте, но не перегружает пользователя
    const getRandomInterval = () => Math.floor(Math.random() * 30000) + 90000 // от 90 до 120 секунд

    const showInterval = setInterval(() => {
      const newNotification = generateRandomNotification()
      setNotification(newNotification)
      setIsVisible(true)

      // Скрываем уведомление через 7 секунд
      // Этого достаточно, чтобы пользователь заметил уведомление, но не слишком долго, чтобы оно мешало
      setTimeout(() => {
        setIsVisible(false)
      }, 7000)
    }, getRandomInterval())

    // Показываем первое уведомление через 8 секунд после загрузки
    // Это дает пользователю время освоиться на странице, прежде чем показывать уведомления
    const initialTimeout = setTimeout(() => {
      const initialNotification = generateRandomNotification()
      setNotification(initialNotification)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 7000)
    }, 8000)

    return () => {
      clearInterval(showInterval)
      clearTimeout(initialTimeout)
    }
  }, [i18n.language])

  if (!notification) return null

  const car = cars.find(c => c.id === notification.carId)
  if (!car) return null

  const isDarkMode = theme === 'dark'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 right-6 z-40 max-w-sm rounded-lg p-4 border-2"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)' 
              : 'linear-gradient(135deg, #f5f0e6 0%, #eee3c8 100%)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderColor: isDarkMode ? '#b78628' : '#d4a74a'
          }}
        >
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={car.image}
                alt={car.name}
                className="h-14 w-14 rounded-lg object-cover shadow-md"
                style={{ border: `1px solid ${isDarkMode ? '#b78628' : '#d4a74a'}` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-1" style={{ color: isDarkMode ? '#ffffff' : '#333333' }}>
                {notification.name}
              </p>
              <p className="text-sm font-medium" style={{ color: isDarkMode ? '#e9be6c' : '#b78628' }}>
                {i18n.language === 'fr' && (
                  <>
                    a réservé <span className="font-semibold">{car.name}</span> il y a <span className="font-semibold">{notification.timeAgo}</span> minutes
                  </>
                )}
                {i18n.language === 'es' && (
                  <>
                    ha reservado <span className="font-semibold">{car.name}</span> hace <span className="font-semibold">{notification.timeAgo}</span> minutos
                  </>
                )}
                {i18n.language === 'en' && (
                  <>
                    booked <span className="font-semibold">{car.name}</span> <span className="font-semibold">{notification.timeAgo}</span> minutes ago
                  </>
                )}
                {i18n.language === 'de' && (
                  <>
                    hat <span className="font-semibold">{car.name}</span> vor <span className="font-semibold">{notification.timeAgo}</span> Minuten gebucht
                  </>
                )}
                {i18n.language === 'ru' && (
                  <>
                    забронировал(а) <span className="font-semibold">{car.name}</span> <span className="font-semibold">{notification.timeAgo}</span> минут назад
                  </>
                )}
                {!['fr', 'es', 'en', 'de', 'ru'].includes(i18n.language) && (
                  <>
                    {t('notifications.booked', { car: car.name, time: notification.timeAgo })}
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingNotifications 