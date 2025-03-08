import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cars } from '../data/cars'
import { useTheme } from '../contexts/ThemeContext'
import axios from 'axios'

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
  ],
  // Международные имена, которые могут появляться в любом языке
  international: [
    'Alex', 'Max', 'Anna', 'Maria', 'Daniel', 'Eva', 'Adam', 'Sofia', 'Leo', 'Nina',
    'Tom', 'Lara', 'Martin', 'Diana', 'Oliver', 'Julia', 'Oscar', 'Emma', 'Lucas', 'Mia'
  ]
}

// Ключ для localStorage
const NOTIFICATION_STORAGE_KEY = 'booking_notifications_state';
const IP_LAST_SEEN_KEY = 'booking_notifications_ip_last_seen';

// Интерфейс для состояния оповещений
interface NotificationState {
  lastShownTimestamp: number;
  shownCount: number;
  ipAddress: string | null;
  pauseUntil: number;
}

const BookingNotifications = () => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const [notification, setNotification] = useState<{ name: string; carId: string; timeAgo: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [notificationState, setNotificationState] = useState<NotificationState>({
    lastShownTimestamp: 0,
    shownCount: 0,
    ipAddress: null,
    pauseUntil: 0
  });
  const [userIp, setUserIp] = useState<string | null>(null);

  // Загружаем состояние из localStorage при монтировании
  useEffect(() => {
    const savedState = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as NotificationState;
        setNotificationState(parsedState);
      } catch (e) {
        console.error('Failed to parse notification state from localStorage', e);
      }
    }

    // Получаем IP пользователя
    const fetchIp = async () => {
      try {
        // Используем бесплатный API для получения IP
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        setUserIp(ip);
        
        // Проверяем, видел ли этот IP уже оповещения
        const ipLastSeen = localStorage.getItem(IP_LAST_SEEN_KEY);
        if (ipLastSeen) {
          try {
            const ipData = JSON.parse(ipLastSeen);
            if (ipData[ip]) {
              // Если этот IP уже видел оповещения, увеличиваем паузу
              const lastSeen = ipData[ip];
              const hoursSinceLastSeen = (Date.now() - lastSeen) / (1000 * 60 * 60);
              
              // Если прошло меньше 4 часов, увеличиваем паузу
              if (hoursSinceLastSeen < 4) {
                setNotificationState(prev => ({
                  ...prev,
                  shownCount: Math.min(prev.shownCount + 2, 5), // Увеличиваем счетчик, но не более 5
                  pauseUntil: Date.now() + 120000 // Добавляем паузу в 2 минуты
                }));
              }
            }
          } catch (e) {
            console.error('Failed to parse IP last seen data', e);
          }
        }
      } catch (e) {
        console.error('Failed to fetch IP address', e);
      }
    };

    fetchIp();
  }, []);

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notificationState));
    
    // Если у нас есть IP, обновляем время последнего посещения
    if (userIp) {
      const ipLastSeen = localStorage.getItem(IP_LAST_SEEN_KEY) || '{}';
      try {
        const ipData = JSON.parse(ipLastSeen);
        ipData[userIp] = Date.now();
        localStorage.setItem(IP_LAST_SEEN_KEY, JSON.stringify(ipData));
      } catch (e) {
        console.error('Failed to update IP last seen data', e);
      }
    }
  }, [notificationState, userIp]);

  // Функция для генерации случайного уведомления с учетом языка и международных имен
  const generateRandomNotification = () => {
    // Выбираем имя с учетом текущего языка, но с шансом на международное имя
    let names;
    const useInternationalName = Math.random() < 0.3; // 30% шанс на международное имя
    
    if (useInternationalName) {
      names = namesByLang.international;
    } else {
      // Выбираем имя из текущего языка с 70% вероятностью
      // или из другого языка с 30% вероятностью
      const currentLangNames = namesByLang[i18n.language as keyof typeof namesByLang];
      if (currentLangNames && Math.random() < 0.7) {
        names = currentLangNames;
      } else {
        // Выбираем случайный язык, отличный от текущего
        const availableLangs = Object.keys(namesByLang).filter(
          lang => lang !== i18n.language && lang !== 'international'
        );
        const randomLang = availableLangs[Math.floor(Math.random() * availableLangs.length)];
        names = namesByLang[randomLang as keyof typeof namesByLang] || namesByLang.en;
      }
    }
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    
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
    // Адаптивный интервал показа оповещений в зависимости от количества уже показанных
    const getAdaptiveInterval = () => {
      const { shownCount } = notificationState;
      
      // Чем больше оповещений показано, тем реже они будут появляться
      if (shownCount === 0) return Math.floor(Math.random() * 30000) + 60000; // 60-90 сек для первого
      if (shownCount === 1) return Math.floor(Math.random() * 30000) + 90000; // 90-120 сек для второго
      if (shownCount === 2) return Math.floor(Math.random() * 30000) + 120000; // 120-150 сек для третьего
      if (shownCount === 3) return Math.floor(Math.random() * 30000) + 150000; // 150-180 сек для четвертого
      return Math.floor(Math.random() * 30000) + 180000; // 180-210 сек для пятого и далее
    };

    // Проверяем, нужно ли показывать оповещения
    const shouldShowNotifications = () => {
      const { pauseUntil, shownCount } = notificationState;
      
      // Если установлена пауза и она еще не истекла, не показываем оповещения
      if (pauseUntil > Date.now()) return false;
      
      // Если показано уже 5 оповещений, показываем с вероятностью 50%
      if (shownCount >= 5) return Math.random() < 0.5;
      
      return true;
    };

    // Показываем уведомление с адаптивным интервалом
    const showInterval = setInterval(() => {
      // Проверяем, нужно ли показывать оповещение
      if (!shouldShowNotifications()) return;
      
      const newNotification = generateRandomNotification();
      setNotification(newNotification);
      setIsVisible(true);
      
      // Обновляем состояние оповещений
      setNotificationState(prev => ({
        ...prev,
        lastShownTimestamp: Date.now(),
        shownCount: prev.shownCount + 1,
        ipAddress: userIp || prev.ipAddress
      }));

      // Скрываем уведомление через 7 секунд
      setTimeout(() => {
        setIsVisible(false);
      }, 7000);
    }, getAdaptiveInterval());

    // Показываем первое уведомление через 8-15 секунд после загрузки,
    // но только если это первый визит или прошло достаточно времени
    const initialTimeout = setTimeout(() => {
      const { lastShownTimestamp, pauseUntil } = notificationState;
      const hoursSinceLastShown = (Date.now() - lastShownTimestamp) / (1000 * 60 * 60);
      
      // Показываем первое оповещение только если:
      // 1. Это первый визит (lastShownTimestamp === 0)
      // 2. Прошло более 2 часов с последнего показа
      // 3. Нет активной паузы
      if ((lastShownTimestamp === 0 || hoursSinceLastShown > 2) && pauseUntil <= Date.now()) {
        const initialNotification = generateRandomNotification();
        setNotification(initialNotification);
        setIsVisible(true);
        
        // Обновляем состояние оповещений
        setNotificationState(prev => ({
          ...prev,
          lastShownTimestamp: Date.now(),
          shownCount: prev.shownCount + 1,
          ipAddress: userIp || prev.ipAddress
        }));
        
        setTimeout(() => setIsVisible(false), 7000);
      }
    }, Math.floor(Math.random() * 7000) + 8000); // от 8 до 15 секунд

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimeout);
    }
  }, [i18n.language, notificationState, userIp]);

  if (!notification) return null;

  const car = cars.find(c => c.id === notification.carId);
  if (!car) return null;

  const isDarkMode = theme === 'dark';

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