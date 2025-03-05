import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  TruckIcon, 
  ClockIcon, 
  CheckBadgeIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyEuroIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { cars } from '../data/cars'
import ReviewsSection from '../components/ReviewsSection'
import LazyImage from '../components/LazyImage'
import { DatePicker } from '@headlessui/react'

interface QuickSearchForm {
  pickupDate: string
  returnDate: string
  category: string
  priceRange: number
}

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [quickSearch, setQuickSearch] = useState<QuickSearchForm>({
    pickupDate: '',
    returnDate: '',
    category: 'All',
    priceRange: 200
  })
  const [pickupDate, setPickupDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)

  const features = [
    {
      nameKey: 'home.features.fleet.title',
      descriptionKey: 'home.features.fleet.description',
      icon: TruckIcon,
    },
    {
      nameKey: 'home.features.service.title',
      descriptionKey: 'home.features.service.description',
      icon: ClockIcon,
    },
    {
      nameKey: 'home.features.process.title',
      descriptionKey: 'home.features.process.description',
      icon: CheckBadgeIcon,
    },
  ]

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/catalog', {
      state: { filters: quickSearch },
      search: `?category=${quickSearch.category}&priceRange=${quickSearch.priceRange}`
    })
  }

  const popularCars = cars.slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-premium-black">
      {/* Hero Section with Booking Form */}
      <section className="relative h-[80vh] bg-gradient-to-r from-premium-black to-premium-black/90">
        <div className="absolute inset-0">
          <LazyImage
            src="/hero-bg.jpg"
            alt="Luxury cars"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-premium-gold">O.V. Automoción</span>
              <br />
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-premium-silver mb-8">
              {t('home.hero.subtitle')}
            </p>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white dark:bg-premium-black/90 p-6 rounded-lg shadow-xl max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
                  {t('booking.pickupDate')}
                </label>
                <DatePicker
                  selected={pickupDate}
                  onChange={setPickupDate}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
                  {t('booking.returnDate')}
                </label>
                <DatePicker
                  selected={returnDate}
                  onChange={setReturnDate}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700"
                />
              </div>
              <button
                className="bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                {t('booking.searchButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t('home.features.support24.title')}</h3>
              <p className="text-gray-600 dark:text-premium-silver">{t('home.features.support24.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t('home.features.fastDelivery.title')}</h3>
              <p className="text-gray-600 dark:text-premium-silver">{t('home.features.fastDelivery.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{t('home.features.insurance.title')}</h3>
              <p className="text-gray-600 dark:text-premium-silver">{t('home.features.insurance.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Car Catalog Section */}
      <section className="py-16 bg-gray-50 dark:bg-premium-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            {t('home.catalog.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <motion.div
                key={car.id}
                className="bg-white dark:bg-premium-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <LazyImage
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-premium-gold text-white px-4 py-1 rounded-full">
                    {t('common.fromPrice', { price: car.price })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{car.name}</h3>
                  <p className="text-gray-600 dark:text-premium-silver mb-4">{car.description}</p>
                  <button
                    onClick={() => navigate(`/catalog/${car.id}`)}
                    className="w-full bg-premium-black hover:bg-premium-black/90 text-white dark:bg-premium-gold dark:hover:bg-premium-gold/90 font-bold py-2 px-4 rounded-md transition-colors"
                  >
                    {t('common.bookNow')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные автомобили */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('home.popular.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              {t('home.popular.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {popularCars.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ y: -10 }}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="flex-shrink-0">
                  <LazyImage 
                    src={car.image} 
                    alt={car.name} 
                    className="h-48 w-full" 
                    placeholderClassName="bg-gray-200 dark:bg-gray-700 animate-pulse"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {t(`catalog.categories.${car.category.toLowerCase()}`)}
                    </p>
                    <div className="mt-2">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{car.name}</p>
                    </div>
                    <div className="mt-3">
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {t(`popularCars.${car.id === 1 ? 'mercedes_c_class' : car.id === 2 ? 'volkswagen_golf' : 'toyota_rav4_hybrid'}.description`)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex-shrink-0">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {car.price} €/{t('catalog.car.perDay')}
                      </p>
                    </div>
                    <div className="ml-4">
                      <Link
                        to={`/catalog/${car.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {t('home.popular.details')}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('home.popular.viewAll')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="mt-16">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <motion.div 
                  key={feature.nameKey}
                  whileHover={{ y: -5 }}
                  className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {t(feature.nameKey)}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                    {t(feature.descriptionKey)}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Процесс аренды */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('home.process.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {t('home.process.description')}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            {[
              {
                icon: CalendarDaysIcon,
                title: t('home.process.step1.title'),
                description: t('home.process.step1.description'),
              },
              {
                icon: MapPinIcon,
                title: t('home.process.step2.title'),
                description: t('home.process.step2.description'),
              },
              {
                icon: CurrencyEuroIcon,
                title: t('home.process.step3.title'),
                description: t('home.process.step3.description'),
              },
              {
                icon: TruckIcon,
                title: t('home.process.step4.title'),
                description: t('home.process.step4.description'),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-indigo-100 p-3">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <ReviewsSection />

      {/* Контактная форма */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('contact.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {t('contact.subtitle')}
            </p>
            <div className="mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg"
              >
                {t('contact.title')}
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 