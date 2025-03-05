import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { cars } from '../data/cars'
import PageTransition from '../components/PageTransition'
import { useCart } from '../contexts/CartContext'
import { CheckIcon } from '@heroicons/react/24/outline'
import ImageGallery from '../components/ImageGallery'
import LazyImage from '../components/LazyImage'

const CarDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart, isInCart } = useCart()

  // Находим автомобиль по ID
  const car = cars.find(c => c.id === Number(id))

  // Определение похожих автомобилей
  const similarCars = useMemo(() => {
    if (!car) return []
    return cars
      .filter(c => c.id !== car.id && c.category === car.category)
      .slice(0, 3)
  }, [car])

  if (!car) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('carDetail.notFound')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('carDetail.notFoundDescription')}
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="mt-4 btn-primary"
            >
              {t('carDetail.backToCatalog')}
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  // Дополнительные изображения автомобиля (будут добавлены позже)
  const images = [
    car.image,
    car.image.replace('.jpg', '-interior.jpg'),
    car.image.replace('.jpg', '-back.jpg'),
    car.image.replace('.jpg', '-side.jpg'),
  ]

  const highlights = [
    {
      icon: CalendarDaysIcon,
      title: t('carDetail.highlights.year'),
      value: car.specs.year.toString()
    },
    {
      icon: ClockIcon,
      title: t('carDetail.highlights.transmission'),
      value: t(`catalog.car.specs.value.${car.specs.transmission.toLowerCase()}`)
    },
    {
      icon: CheckCircleIcon,
      title: t('carDetail.highlights.fuel'),
      value: t(`catalog.car.specs.value.${car.specs.fuel.toLowerCase()}`)
    },
    {
      icon: MapPinIcon,
      title: t('carDetail.highlights.consumption'),
      value: car.specs.fuel === 'Electric' 
        ? t('catalog.car.specs.value.consumption_electric')
        : t('catalog.car.specs.value.consumption', { value: car.specs.consumption })
    }
  ]

  const handleAddToCart = () => {
    // Добавляем автомобиль в корзину с дефолтными датами (неделя вперед)
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)

    addToCart({
      car,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      pickupLocation: 'Vila-seca',
      returnLocation: 'Vila-seca'
    })
  }

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900">
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
            <li>
              <Link to="/catalog" className="hover:text-gray-700 dark:hover:text-gray-300">
                {t('breadcrumbs.catalog')}
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
            {/* Галерея изображений */}
            <div>
              <div className="relative h-64 sm:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-2 sm:mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full"
                >
                  <LazyImage
                    src={images[selectedImageIndex]}
                    alt={car.name}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-16 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-premium-gold' : ''
                    }`}
                  >
                    <LazyImage
                      src={image}
                      alt={`${car.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Информация о машине */}
            <div className="mt-6 lg:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>

              <div className="mt-4 sm:mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('carDetail.description')}</h2>
                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {t('catalog.car.defaultDescription', { name: car.name, category: t(`catalog.categories.${car.category.toLowerCase()}`) })}
                </p>
              </div>

              <div className="mt-4 sm:mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('carDetail.features')}</h2>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {car.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-400"
                    >
                      <CheckIcon className="h-5 w-5 text-premium-gold mr-2" />
                      {t(`features.${feature}`)}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => addToCart(car)}
                  disabled={isInCart(car.id)}
                  className={`w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium rounded-md shadow-sm ${
                    isInCart(car.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-premium-gold hover:bg-premium-gold/90 text-white'
                  } transition-colors duration-200`}
                >
                  {isInCart(car.id) ? t('carDetail.inCart') : t('carDetail.addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Характеристики */}
        <div className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t('carDetail.specifications')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(car.specs).map(([key, value]) => (
                <div key={key} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t(`catalog.car.specs.${key}`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {key === 'seats'
                      ? t('catalog.car.specs.value.seats', { value })
                      : key === 'consumption'
                        ? (car.specs.fuel === 'Electric'
                            ? t('catalog.car.specs.value.consumption_electric')
                            : t('catalog.car.specs.value.consumption', { value }))
                        : (key === 'transmission' || key === 'fuel'
                            ? t(`catalog.car.specs.value.${value.toLowerCase()}`)
                            : value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Похожие автомобили */}
        <div className="py-8 sm:py-12 bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">{t('carDetail.similarCars')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {similarCars.map((similarCar) => (
                <motion.div
                  key={similarCar.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <Link to={`/catalog/${similarCar.id}`} className="block">
                    <div className="relative h-48 sm:h-56">
                      <img
                        src={similarCar.image}
                        alt={similarCar.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">{similarCar.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t(`catalog.categories.${similarCar.category.toLowerCase()}`)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default CarDetailPage