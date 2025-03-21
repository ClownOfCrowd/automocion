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
  ],
  // Международные имена, которые могут появляться в любом языке
  international: [
    'Alex', 'Max', 'Anna', 'Maria', 'Daniel', 'Eva', 'Adam', 'Sofia', 'Leo', 'Nina',
    'Tom', 'Lara', 'Martin', 'Diana', 'Oliver', 'Julia', 'Oscar', 'Emma', 'Lucas', 'Mia'
  ]
}

// Ключи для localStorage
const NOTIFICATION_STORAGE_KEY = 'booking_notifications_state';
const IP_STORAGE_KEY = 'booking_notifications_ip_data';

// Интерфейс для состояния оповещений
interface NotificationState {
  lastShownTimestamp: number;
  shownCount: number;
  pauseUntil: number;
}

// Интерфейс для хранения данных по IP
interface IpData {
  ipAddress: string;
  shownCount: number;
  lastSeen: number;
}

// Функция для получения "фингерпринта" браузера как замена IP
const getBrowserFingerprint = (): string => {
  const userAgent = navigator.userAgent;
  const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = new Date().getTimezoneOffset();
  const language = navigator.language;
  
  // Создаем "отпечаток" из этих данных
  return btoa(`${userAgent}-${screenInfo}-${timezone}-${language}`);
};

const BookingNotifications = () => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const [notification, setNotification] = useState<{ name: string; carId: string; timeAgo: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [notificationState, setNotificationState] = useState<NotificationState>({
    lastShownTimestamp: 0,
    shownCount: 0,
    pauseUntil: 0
  });
  const [ipData, setIpData] = useState<IpData | null>(null);

  // Инициализация состояния
  useEffect(() => {
    // Получаем fingerprint браузера
    const fingerprint = getBrowserFingerprint();
    
    // Пытаемся получить сохраненные данные
    const savedIpData = localStorage.getItem(IP_STORAGE_KEY);
    if (savedIpData) {
      try {
        const parsedData = JSON.parse(savedIpData) as IpData;
        setIpData(parsedData);
        
        // Если fingerprint совпадает с сохраненным и показано >= 2 уведомлений
        if (parsedData.ipAddress === fingerprint && parsedData.shownCount >= 2) {
          // Устанавливаем длительную паузу (7 дней)
          const pauseTime = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах
          setNotificationState(prev => ({
            ...prev,
            pauseUntil: Date.now() + pauseTime
          }));
        }
      } catch (e) {
        console.error('Error parsing saved IP data', e);
        // Если данные повреждены, создаем новые
        const newIpData = {
          ipAddress: fingerprint,
          shownCount: 0,
          lastSeen: Date.now()
        };
        setIpData(newIpData);
        localStorage.setItem(IP_STORAGE_KEY, JSON.stringify(newIpData));
      }
    } else {
      // Первое посещение, инициализируем данные
      const newIpData = {
        ipAddress: fingerprint,
        shownCount: 0,
        lastSeen: Date.now()
      };
      setIpData(newIpData);
      localStorage.setItem(IP_STORAGE_KEY, JSON.stringify(newIpData));
    }
  }, []);

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
    
    // Модифицируем распределение времени бронирования
    let timeAgo;
    const rand = Math.random();
    if (rand < 0.7) {
      // 70% бронирований в последние 30 минут
      timeAgo = Math.floor(Math.random() * 25) + 5; // от 5 до 30 минут
    } else {
      // 30% бронирований от 30 до 60 минут
      timeAgo = Math.floor(Math.random() * 30) + 30; // от 30 до 60 минут
    }

    return {
      name: randomName,
      carId: randomCar.id,
      timeAgo
    }
  }

  useEffect(() => {
    // Увеличенные интервалы для более редкого показа
    const getAdaptiveInterval = () => {
      const { shownCount } = notificationState;
      // Первое уведомление через 30-90 секунд
      if (shownCount === 0) return Math.floor(Math.random() * 60000) + 30000; 
      // Второе уведомление через 2-3 минуты
      if (shownCount === 1) return Math.floor(Math.random() * 60000) + 120000; // 2-3 мин
      // Последующие уведомления не должны показываться, но на всякий случай большой интервал
      return 30 * 60 * 1000; // 30 минут
    };

    // Логика проверки показа уведомлений
    const shouldShowNotifications = () => {
      const { pauseUntil } = notificationState;
      
      // Проверка времени паузы
      if (pauseUntil > Date.now()) return false;
      
      // Проверка по IP/fingerprint - строго максимум 2 уведомления
      if (ipData && ipData.shownCount >= 2) return false;
      
      // Проверка на текущее видимое состояние
      if (isVisible) return false;
      
      return true;
    };

    // Показываем уведомление с адаптивным интервалом
    const showInterval = setInterval(() => {
      if (!shouldShowNotifications()) return;
      
      const newNotification = generateRandomNotification();
      setNotification(newNotification);
      setIsVisible(true);
      
      // Увеличиваем счетчик для текущего пользователя
      if (ipData) {
        const updatedIpData = {
          ...ipData,
          shownCount: ipData.shownCount + 1,
          lastSeen: Date.now()
        };
        setIpData(updatedIpData);
        // Немедленно сохраняем в localStorage для синхронизации между вкладками
        localStorage.setItem(IP_STORAGE_KEY, JSON.stringify(updatedIpData));
        
        // Если это второе уведомление, устанавливаем длительную паузу
        if (updatedIpData.shownCount >= 2) {
          const pauseTime = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах
          setNotificationState(prev => ({
            ...prev,
            pauseUntil: Date.now() + pauseTime
          }));
        }
      }
      
      // Скрываем уведомление через 8 секунд
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      
      setNotificationState(prev => ({
        ...prev,
        lastShownTimestamp: Date.now(),
        shownCount: prev.shownCount + 1
      }));
    }, getAdaptiveInterval());

    return () => {
      clearInterval(showInterval);
    };
  }, [notificationState, isVisible, ipData]);

  // Дополнительный эффект для синхронизации изменений localStorage между вкладками
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === IP_STORAGE_KEY && event.newValue) {
        try {
          const updatedData = JSON.parse(event.newValue) as IpData;
          setIpData(updatedData);
          
          // Если уже показано 2 уведомления, устанавливаем паузу
          if (updatedData.shownCount >= 2) {
            const pauseTime = 7 * 24 * 60 * 60 * 1000; // 7 дней
            setNotificationState(prev => ({
              ...prev,
              pauseUntil: Date.now() + pauseTime
            }));
          }
        } catch (e) {
          console.error('Error parsing updated IP data from storage event', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatTimeAgo = (minutes: number) => {
    if (minutes < 60) {
      return {
        value: minutes,
        isHour: false
      };
    }
    return {
      value: Math.floor(minutes / 60),
      isHour: true
    };
  };

  if (!notification) return null;

  const car = cars.find(c => c.id === notification.carId);
  if (!car) return null;

  const isDarkMode = theme === 'dark';
  const timeFormatted = formatTimeAgo(notification.timeAgo);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
                    a réservé <span className="font-semibold">{car.name}</span> {timeFormatted.isHour ? (
                      <>il y a <span className="font-semibold">{timeFormatted.value}</span> {timeFormatted.value === 1 ? 'heure' : 'heures'}</>
                    ) : (
                      <>il y a <span className="font-semibold">{timeFormatted.value}</span> minutes</>
                    )}
                  </>
                )}
                {i18n.language === 'es' && (
                  <>
                    ha reservado <span className="font-semibold">{car.name}</span> hace <span className="font-semibold">{timeFormatted.value}</span> {timeFormatted.isHour ? (
                      timeFormatted.value === 1 ? 'hora' : 'horas'
                    ) : 'minutos'}
                  </>
                )}
                {i18n.language === 'en' && (
                  <>
                    booked <span className="font-semibold">{car.name}</span> <span className="font-semibold">{timeFormatted.value}</span> {timeFormatted.isHour ? (
                      timeFormatted.value === 1 ? 'hour' : 'hours'
                    ) : 'minutes'} ago
                  </>
                )}
                {i18n.language === 'de' && (
                  <>
                    hat <span className="font-semibold">{car.name}</span> vor <span className="font-semibold">{timeFormatted.value}</span> {timeFormatted.isHour ? (
                      timeFormatted.value === 1 ? 'Stunde' : 'Stunden'
                    ) : 'Minuten'} gebucht
                  </>
                )}
                {i18n.language === 'ru' && (
                  <>
                    забронировал(а) <span className="font-semibold">{car.name}</span> <span className="font-semibold">{timeFormatted.value}</span> {timeFormatted.isHour ? (
                      timeFormatted.value === 1 ? 'час' : (timeFormatted.value < 5 ? 'часа' : 'часов')
                    ) : (
                      timeFormatted.value === 1 ? 'минуту' : (
                        timeFormatted.value < 5 ? 'минуты' : (
                          timeFormatted.value > 20 && timeFormatted.value % 10 === 1 ? 'минуту' : (
                            timeFormatted.value > 20 && timeFormatted.value % 10 < 5 ? 'минуты' : 'минут'
                          )
                        )
                      )
                    )} назад
                  </>
                )}
                {!['fr', 'es', 'en', 'de', 'ru'].includes(i18n.language) && (
                  <>
                    {t('notifications.booked', { car: car.name, time: timeFormatted.value, unit: timeFormatted.isHour ? t('time.hours') : t('time.minutes') })}
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