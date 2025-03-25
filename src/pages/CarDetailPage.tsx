import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { 
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  TruckIcon,
  BeakerIcon,
  CogIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { cars } from '../data/cars'
import PageTransition from '../components/PageTransition'
import { CheckIcon } from '@heroicons/react/24/outline'
import LazyImage from '../components/LazyImage'

const CarDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [pickupDate, setPickupDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [pickupLocation, setPickupLocation] = useState('Vila-seca')
  const [returnLocation, setReturnLocation] = useState('Vila-seca')

  useEffect(() => {
    // Устанавливаем даты по умолчанию при загрузке страницы
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    
    setPickupDate(today)
    setReturnDate(nextWeek)
  }, [])

  // Находим автомобиль по ID
  const car = cars.find(c => c.id === id)

  // Определение похожих автомобилей
  const similarCars = useMemo(() => {
    if (!car) return []
    return cars
      .filter(c => c.id !== car.id && c.category === car.category)
      .slice(0, 3)
  }, [car])

  const totalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0
    const diff = returnDate.getTime() - pickupDate.getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  }, [pickupDate, returnDate])

  const totalPrice = useMemo(() => {
    if (!car || totalDays === 0) return 0
    return car.price * totalDays
  }, [car, totalDays])

  const handleBookNow = () => {
    const currentLang = i18n.language || 'es';
    
    // Форматирование даты для сообщения
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    
    let message = '';
    
    if (currentLang === 'es') {
      message = `Hola, me gustaría reservar un coche:\n\n` +
                `🚗 Modelo: ${car?.name}\n` +
                `📅 Fecha de recogida: ${formatDate(pickupDate)}\n` +
                `📅 Fecha de devolución: ${formatDate(returnDate)}\n` +
                `📍 Lugar de recogida: ${pickupLocation}\n` +
                `📍 Lugar de devolución: ${returnLocation}\n` +
                `💰 Precio total: ${totalPrice}€`;
    } else if (currentLang === 'ru') {
      message = `Здравствуйте, я хотел бы забронировать автомобиль:\n\n` +
                `🚗 Модель: ${car?.name}\n` +
                `📅 Дата получения: ${formatDate(pickupDate)}\n` +
                `📅 Дата возврата: ${formatDate(returnDate)}\n` +
                `📍 Место получения: ${pickupLocation}\n` +
                `📍 Место возврата: ${returnLocation}\n` +
                `💰 Общая стоимость: ${totalPrice}€`;
    } else if (currentLang === 'fr') {
      message = `Bonjour, je souhaiterais réserver une voiture:\n\n` +
                `🚗 Modèle: ${car?.name}\n` +
                `📅 Date de prise en charge: ${formatDate(pickupDate)}\n` +
                `📅 Date de retour: ${formatDate(returnDate)}\n` +
                `📍 Lieu de prise en charge: ${pickupLocation}\n` +
                `📍 Lieu de retour: ${returnLocation}\n` +
                `💰 Prix total: ${totalPrice}€`;
    } else if (currentLang === 'de') {
      message = `Hallo, ich möchte ein Auto buchen:\n\n` +
                `🚗 Modell: ${car?.name}\n` +
                `📅 Abholdatum: ${formatDate(pickupDate)}\n` +
                `📅 Rückgabedatum: ${formatDate(returnDate)}\n` +
                `📍 Abholort: ${pickupLocation}\n` +
                `📍 Rückgabeort: ${returnLocation}\n` +
                `💰 Gesamtpreis: ${totalPrice}€`;
    } else {
      // English default
      message = `Hello, I would like to book a car:\n\n` +
                `🚗 Model: ${car?.name}\n` +
                `📅 Pickup date: ${formatDate(pickupDate)}\n` +
                `📅 Return date: ${formatDate(returnDate)}\n` +
                `📍 Pickup location: ${pickupLocation}\n` +
                `📍 Return location: ${returnLocation}\n` +
                `💰 Total price: ${totalPrice}€`;
    }
    
    // Открываем WhatsApp с подготовленным сообщением
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/34671332591?text=${encodedMessage}`, '_blank');
  };

  if (!car) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('carDetail.notFound')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('carDetail.notFoundDescription')}
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              {t('carDetail.backToCatalog')}
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  const highlights = [
    {
      icon: CalendarDaysIcon,
      title: t('carDetail.highlights.year'),
      value: car.specs?.year.toString() || '2022'
    },
    {
      icon: ClockIcon,
      title: t('carDetail.highlights.transmission'),
      value: car.transmission
    },
    {
      icon: BeakerIcon,
      title: t('carDetail.highlights.fuel'),
      value: car.fuel
    },
    {
      icon: UserIcon,
      title: t('carDetail.highlights.seats'),
      value: car.seats.toString()
    },
    {
      icon: TruckIcon,
      title: t('carDetail.highlights.luggage'),
      value: car.luggage.toString()
    },
    {
      icon: CogIcon,
      title: t('carDetail.highlights.power'),
      value: `${car.power} CV`
    }
  ]

  return (
    <PageTransition>
      <div className="bg-white dark:bg-premium-black">
        {/* Хлебные крошки */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                {t('breadcrumbs.home')}
              </Link>
            </li>
            <li>
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-700 dark:text-gray-300">{car.name}</li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Изображение автомобиля */}
            <div>
              <div className="relative h-64 sm:h-96 bg-gray-100 dark:bg-premium-black rounded-lg overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full"
                >
                  <LazyImage
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </div>
            </div>

            {/* Информация о машине */}
            <div className="mt-6 lg:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
              <p className="mt-2 text-lg text-premium-gold font-semibold">
                {t('common.fromPrice', { price: car.price })} / {t('common.day')}
              </p>

              <div className="mt-4 sm:mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('carDetail.description')}</h2>
                <p className="text-gray-600 dark:text-premium-silver mt-2">
                  {t(car.description)}
                </p>
              </div>

              {/* Основные характеристики */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center p-3 bg-gray-50 dark:bg-premium-black rounded-lg"
                  >
                    <item.icon className="h-6 w-6 text-premium-gold mb-2" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.title}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Форма бронирования */}
              <div className="mt-8 bg-gray-50 dark:bg-premium-black p-4 sm:p-6 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('carDetail.booking')}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('booking.pickupDate')}
                    </label>
                    <DatePicker
                      selected={pickupDate}
                      onChange={(date) => setPickupDate(date)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white py-2 px-3"
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      placeholderText={t('booking.pickupDate')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('booking.returnDate')}
                    </label>
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white py-2 px-3"
                      dateFormat="dd/MM/yyyy"
                      minDate={pickupDate || new Date()}
                      placeholderText={t('booking.returnDate')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('booking.pickupLocation')}
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white py-2 px-3"
                    >
                      <option value="Vila-seca">{t('booking.locationOptions.Vila-seca')}</option>
                      <option value="Tarragona">{t('booking.locationOptions.Tarragona')}</option>
                      <option value="Reus">{t('booking.locationOptions.Reus')}</option>
                      <option value="Salou">{t('booking.locationOptions.Salou')}</option>
                      <option value="La Pineda">{t('booking.locationOptions.La Pineda')}</option>
                      <option value="Cambrils">{t('booking.locationOptions.Cambrils')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('booking.returnLocation')}
                    </label>
                    <select
                      value={returnLocation}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white py-2 px-3"
                    >
                      <option value="Vila-seca">{t('booking.locationOptions.Vila-seca')}</option>
                      <option value="Tarragona">{t('booking.locationOptions.Tarragona')}</option>
                      <option value="Reus">{t('booking.locationOptions.Reus')}</option>
                      <option value="Salou">{t('booking.locationOptions.Salou')}</option>
                      <option value="La Pineda">{t('booking.locationOptions.La Pineda')}</option>
                      <option value="Cambrils">{t('booking.locationOptions.Cambrils')}</option>
                    </select>
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="mb-4 p-3 bg-premium-gold/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{t('booking.totalPrice')}:</span>
                      <span className="text-xl font-bold text-premium-gold">{totalPrice} €</span>
                    </div>
                  </div>
                )}

                <button
                  className="w-full bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-3 px-4 rounded-md transition-colors"
                  onClick={handleBookNow}
                >
                  {t('common.bookNow')}
                </button>
              </div>
            </div>
          </div>

          {/* Особенности и преимущества */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('carDetail.features')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {car.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-4 bg-gray-50 dark:bg-premium-black rounded-lg"
                >
                  <CheckIcon className="h-5 w-5 text-premium-gold mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{t(`features.${feature}`)}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Важная информация о штрафах */}
          <div className="mt-8 p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
            <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">{t('terms.penalties.title')}</h2>
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-400 text-sm">
                <strong>{t('terms.penalties.smoking')}</strong>
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('terms.penalties.details')}</p>
          </div>

          {/* Похожие автомобили */}
          {similarCars.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('carDetail.similarCars')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarCars.map((similarCar) => (
                  <motion.div
                    key={similarCar.id}
                    className="bg-white dark:bg-premium-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-40">
                      <LazyImage
                        src={similarCar.image}
                        alt={similarCar.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-premium-gold text-white px-3 py-1 rounded-full text-sm">
                        {t('common.fromPrice', { price: similarCar.price })}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 dark:text-white">{similarCar.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t(similarCar.description)}</p>
                      <button
                        className="w-full bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/catalog/${similarCar.id}`)}
                      >
                        {t('common.viewDetails')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default CarDetailPage