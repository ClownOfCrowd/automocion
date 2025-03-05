import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
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
          <div className="bg-white dark:bg-premium-black/90 p-4 sm:p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
                  {t('booking.pickupDate')}
                </label>
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white shadow-sm py-3 px-4 text-base"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText={t('booking.pickupDate')}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-premium-silver mb-1">
                  {t('booking.returnDate')}
                </label>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-premium-black dark:text-white shadow-sm py-3 px-4 text-base"
                  dateFormat="dd/MM/yyyy"
                  minDate={pickupDate || new Date()}
                  placeholderText={t('booking.returnDate')}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="w-full bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-3 px-6 rounded-md transition-colors h-[50px] text-base shadow-sm"
                >
                  {t('booking.searchButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-r from-premium-black to-premium-black/90">
        <div className="absolute inset-0">
          <div className="bg-premium-black/50 w-full h-full"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-premium-gold">{t('home.features.title')}</span>
            </h2>
            <p className="text-xl text-premium-silver">{t('home.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('home.features.support24.title')}</h3>
              <p className="text-premium-silver">{t('home.features.support24.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('home.features.fastDelivery.title')}</h3>
              <p className="text-premium-silver">{t('home.features.fastDelivery.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-premium-gold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('home.features.insurance.title')}</h3>
              <p className="text-premium-silver">{t('home.features.insurance.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Car Catalog Section */}
      <section className="py-8 sm:py-16 bg-gray-50 dark:bg-premium-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 dark:text-white">
            {t('home.catalog.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {cars.map((car) => (
              <motion.div
                key={car.id}
                className="bg-white dark:bg-premium-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-40 sm:h-48">
                  <LazyImage
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-premium-gold text-white px-3 sm:px-4 py-1 rounded-full text-sm">
                    {t('common.fromPrice', { price: car.price })}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 dark:text-white">{car.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-premium-silver mb-4">{car.description}</p>
                  <button
                    onClick={() => navigate(`/catalog/${car.id}`)}
                    className="w-full bg-premium-black hover:bg-premium-black/90 text-white dark:bg-premium-gold dark:hover:bg-premium-gold/90 font-bold py-2 sm:py-3 px-4 rounded-md transition-colors text-sm sm:text-base"
                  >
                    {t('common.bookNow')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-12 sm:py-24 bg-white dark:bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-premium-black dark:text-white mb-2 sm:mb-4">
              <span className="text-premium-gold">{t('home.process.title')}</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-premium-silver">{t('home.process.description')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
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
                className="relative text-center p-6 bg-gray-50 dark:bg-premium-black/50 rounded-lg border border-premium-gold/10"
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="rounded-full bg-premium-gold/10 p-3">
                    <step.icon className="h-6 w-6 text-premium-gold" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-premium-black dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-premium-silver">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <ReviewsSection />

      {/* Contact Section */}
      <section className="relative py-24 bg-gradient-to-r from-premium-black to-premium-black/90">
        <div className="absolute inset-0">
          <div className="bg-premium-black/50 w-full h-full"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-premium-gold">{t('contact.title')}</span>
            </h2>
            <p className="text-xl text-premium-silver mb-8">
              {t('contact.subtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="inline-flex items-center px-8 py-4 border border-premium-gold text-base font-medium rounded-md text-white bg-premium-gold hover:bg-premium-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premium-gold shadow-lg"
            >
              {t('contact.form.submit')}
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 