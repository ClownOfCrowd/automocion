import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline'
import PageTransition from '../components/PageTransition'
import { cars } from '../data/cars'
import { useCart } from '../contexts/CartContext'

interface BookingForm {
  startDate: string
  endDate: string
  pickupLocation: string
  returnLocation: string
  firstName: string
  lastName: string
  email: string
  phone: string
  additionalOptions: string[]
}

const additionalOptions = [
  { id: 'gps', name: 'gps', price: 5, description: 'GPS navigation system' },
  { id: 'childSeat', name: 'childSeat', price: 10, description: 'Child safety seat' },
  { id: 'insurance', name: 'insurance', price: 15, description: 'Additional insurance coverage' },
  { id: 'wifi', name: 'wifi', price: 8, description: 'Portable WiFi hotspot' },
]

const locations = [
  'Aeropuerto de Reus',
  'Estación de Cambrils',
  'Centro de Cambrils',
  'Hotel (bajo petición)',
]

const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const carId = searchParams.get('car')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Получаем выбранный автомобиль по ID из URL
  const selectedCar = useMemo(() => {
    if (!carId) return null
    return cars.find(car => car.id === parseInt(carId, 10)) || null
  }, [carId])

  // Определение переменной today
  const today = useMemo(() => {
    const date = new Date()
    return date.toISOString().split('T')[0]
  }, [])

  const [form, setForm] = useState<BookingForm>({
    startDate: '',
    endDate: '',
    pickupLocation: locations[0],
    returnLocation: locations[0],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalOptions: [],
  })

  // Определение minReturnDate после form
  const minReturnDate = useMemo(() => {
    if (!form.startDate) return today
    return form.startDate
  }, [form.startDate, today])

  // Вспомогательные функции
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const rentalDays = useMemo(() => {
    if (!form.startDate || !form.endDate) return 1
    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }, [form.startDate, form.endDate])

  const getLocationName = (location: string) => {
    return location
  }

  const calculateTotal = () => {
    if (!selectedCar) return 0
    
    let total = selectedCar.price * rentalDays
    
    // Добавляем стоимость дополнительных опций
    form.additionalOptions.forEach(optionId => {
      const option = additionalOptions.find(opt => opt.id === optionId)
      if (option) {
        total += option.price
      }
    })
    
    // Добавляем плату за разные места получения и возврата
    if (form.pickupLocation !== form.returnLocation) {
      total += 50
    }
    
    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedCar) {
      // Добавляем автомобиль в корзину
      addToCart({
        car: selectedCar,
        startDate: form.startDate,
        endDate: form.endDate,
        pickupLocation: form.pickupLocation,
        returnLocation: form.returnLocation,
        additionalOptions: form.additionalOptions
      })
      
      // Перенаправляем на страницу оформления заказа
      navigate('/checkout')
    }
  }

  const handleOptionToggle = (optionId: string) => {
    setForm(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId]
    }))
  }

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {t('booking.title')}
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('booking.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Форма бронирования */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t('booking.rental.title')}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('booking.rental.pickup')}
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="pickupDate"
                            name="pickupDate"
                            value={form.startDate}
                            onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                            min={today}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('booking.rental.return')}
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="returnDate"
                            name="returnDate"
                            value={form.endDate}
                            onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                            min={minReturnDate}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('booking.rental.pickupLocation')}
                        </label>
                        <div className="mt-1">
                          <select
                            id="pickupLocation"
                            name="pickupLocation"
                            value={form.pickupLocation}
                            onChange={e => setForm(prev => ({ ...prev, pickupLocation: e.target.value }))}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                            required
                          >
                            <option value="">{t('booking.rental.selectLocation')}</option>
                            {locations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="returnLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('booking.rental.returnLocation')}
                        </label>
                        <div className="mt-1">
                          <select
                            id="returnLocation"
                            name="returnLocation"
                            value={form.returnLocation}
                            onChange={e => setForm(prev => ({ ...prev, returnLocation: e.target.value }))}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                            required
                          >
                            <option value="">{t('booking.rental.selectLocation')}</option>
                            {locations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        {t('booking.options.title')}
                      </h3>
                      <div className="space-y-4">
                        {additionalOptions.map((option) => (
                          <div key={option.id} className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id={option.id}
                                name={option.id}
                                type="checkbox"
                                checked={form.additionalOptions.includes(option.id)}
                                onChange={() => handleOptionToggle(option.id)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={option.id} className="font-medium text-gray-700 dark:text-gray-300">
                                {t(`booking.options.${option.name}`)} (+{option.price}€)
                              </label>
                              <p className="text-gray-500 dark:text-gray-400">{t(`booking.options.${option.name}Description`)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        {t('booking.personal.title')}
                      </h3>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('booking.personal.firstName')}
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={form.firstName}
                              onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('booking.personal.lastName')}
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={form.lastName}
                              onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('booking.personal.email')}
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={form.email}
                              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('booking.personal.phone')}
                          </label>
                          <div className="mt-1">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={form.phone}
                              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {t('booking.continue')}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Сводка заказа */}
            <div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t('booking.summary.title')}
                  </h2>

                  {selectedCar ? (
                    <div className="space-y-4">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={selectedCar.image}
                          alt={selectedCar.name}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {selectedCar.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDaysIcon className="h-5 w-5 mr-1 text-gray-400" />
                        <span>
                          {form.startDate && form.endDate
                            ? `${formatDate(form.startDate)} - ${formatDate(form.endDate)} (${rentalDays} ${t('booking.summary.days')})`
                            : t('booking.summary.selectDates')}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="h-5 w-5 mr-1 text-gray-400" />
                        <span>
                          {form.pickupLocation
                            ? getLocationName(form.pickupLocation)
                            : t('booking.summary.selectLocation')}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          {t('booking.summary.price')}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              {selectedCar.name} x {rentalDays} {t('booking.summary.days')}
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {(selectedCar.price * rentalDays).toFixed(2)}€
                            </span>
                          </div>
                          {form.additionalOptions.map((optionId) => {
                            const option = additionalOptions.find(opt => opt.id === optionId)
                            return option ? (
                              <div key={optionId} className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {t(`booking.options.${option.name}`)}
                                </span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                  {option.price.toFixed(2)}€
                                </span>
                              </div>
                            ) : null
                          })}
                          {form.pickupLocation !== form.returnLocation && (
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                {t('booking.summary.differentLocation')}
                              </span>
                              <span className="text-gray-900 dark:text-white font-medium">50.00€</span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                          <span className="text-base font-medium text-gray-900 dark:text-white">
                            {t('booking.summary.total')}
                          </span>
                          <span className="text-base font-medium text-gray-900 dark:text-white">
                            {calculateTotal().toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">{t('booking.summary.noCar')}</p>
                      <Link
                        to="/catalog"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {t('booking.summary.selectCar')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t('booking.help.title')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex">
                      <PhoneIcon className="h-6 w-6 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t('booking.help.phone')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">+34 600 000 000</p>
                      </div>
                    </div>
                    <div className="flex">
                      <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t('booking.help.email')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">info@automocion.es</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default BookingPage 