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
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section с формой быстрого поиска */}
      <div className="relative h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt={t('home.hero.title')}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">{t('home.hero.title')}</span>
              <span className="block text-indigo-400">{t('home.hero.subtitle')}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-xl text-gray-300 sm:max-w-3xl">
              {t('home.hero.description')}
            </p>
          </motion.div>

          {/* Форма быстрого поиска */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto w-full"
          >
            <form onSubmit={handleQuickSearch} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('booking.rental.pickup')}
                  </label>
                  <input
                    type="date"
                    value={quickSearch.pickupDate}
                    onChange={(e) => setQuickSearch({ ...quickSearch, pickupDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('booking.rental.return')}
                  </label>
                  <input
                    type="date"
                    value={quickSearch.returnDate}
                    onChange={(e) => setQuickSearch({ ...quickSearch, returnDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('catalog.filters.category')}
                  </label>
                  <select
                    value={quickSearch.category}
                    onChange={(e) => setQuickSearch({ ...quickSearch, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="All">{t('catalog.categories.all')}</option>
                    <option value="Premium">{t('catalog.categories.premium')}</option>
                    <option value="SUV">{t('catalog.categories.suv')}</option>
                    <option value="Economy">{t('catalog.categories.economy')}</option>
                    <option value="Electric">{t('catalog.categories.electric')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('catalog.filters.priceRange')}
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={quickSearch.priceRange}
                      onChange={(e) => setQuickSearch({ ...quickSearch, priceRange: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">
                      {quickSearch.priceRange}€/day
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  {t('home.search.button')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

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
                  <img className="h-48 w-full object-cover" src={car.image} alt={car.name} />
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
                        {car.price} €/día
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