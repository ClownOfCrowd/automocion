import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { cars } from '../data/cars'
import PageTransition from '../components/PageTransition'
import CompareDrawer from '../components/CompareDrawer'
import { ScaleIcon } from '@heroicons/react/24/outline'
import { useLoadingManager } from '../hooks/useLoadingManager'
import { useCart } from '../contexts/CartContext'
import LazyImage from '../components/LazyImage'

interface Car {
  id: number
  name: string
  category: string
  price: number
  image: string
  specs: {
    seats: number
    transmission: string
    fuel: string
    consumption: number // л/100км
    year: number
  }
  features: string[]
  available: boolean
}

const categories = ['All', 'Premium', 'SUV', 'Economy', 'Electric']
const transmissions = ['All', 'Automatic', 'Manual']
const fuelTypes = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric']
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
]

const CatalogPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTransmission, setSelectedTransmission] = useState('All')
  const [selectedFuel, setSelectedFuel] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('price-asc')
  const [compareList, setCompareList] = useState<Car[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const { withLoading } = useLoadingManager({
    complexPaths: ['/catalog'],
    delayTime: 500,
    minimumLoadingTime: 700
  })
  const { addToCart, isInCart } = useCart()

  const filteredCars = cars
    .filter(car => {
      const categoryMatch = selectedCategory === 'All' || car.category === selectedCategory
      const transmissionMatch = selectedTransmission === 'All' || car.specs.transmission === selectedTransmission
      const fuelMatch = selectedFuel === 'All' || car.specs.fuel === selectedFuel
      const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1]
      
      return categoryMatch && transmissionMatch && fuelMatch && priceMatch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  const handleCompare = (car: Car) => {
    if (compareList.find(c => c.id === car.id)) {
      setCompareList(compareList.filter(c => c.id !== car.id))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, car])
    }
  }

  const handleRemoveFromCompare = (carId: number) => {
    setCompareList(compareList.filter(car => car.id !== carId))
  }

  // При открытии деталей автомобиля используем force только для первой загрузки
  const handleCarClick = async (carId: number) => {
    const isFirstLoad = !sessionStorage.getItem(`car-${carId}-viewed`)
    if (isFirstLoad) {
      await withLoading(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            navigate(`/catalog/${carId}`)
            resolve()
          }, 100)
        }),
        true
      )
    } else {
      navigate(`/catalog/${carId}`)
    }
    sessionStorage.setItem(`car-${carId}-viewed`, 'true')
  }

  const handleAddToCart = (car: Car) => {
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

  // Функция для форматирования цены в зависимости от языка
  const formatPrice = (price: number) => {
    // В испанском и некоторых других языках символ валюты ставится перед числом
    const currentLanguage = i18n.language;
    if (currentLanguage === 'es') {
      return `€${price.toFixed(2)}`;
    }
    // Для остальных языков оставляем как есть (символ после числа)
    return `${price.toFixed(2)}€`;
  }

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t('catalog.title')}
              </h1>
              <div className="flex items-center gap-4">
                {compareList.length > 0 && (
                  <button
                    onClick={() => setIsCompareOpen(true)}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    <ScaleIcon className="h-5 w-5" />
                    {t('catalog.compare.button')} ({compareList.length})
                  </button>
                )}
                <div className="w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(`catalog.sort.${option.value}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Фильтры */}
            <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
              {/* Категории */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('catalog.filters.category')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {t(`catalog.categories.${category.toLowerCase()}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Трансмиссия */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('catalog.filters.transmission')}
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {transmissions.map((transmission) => (
                    <option key={transmission} value={transmission}>
                      {t(`catalog.filters.transmissions.${transmission}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Тип топлива */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('catalog.filters.fuel')}
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {t(`catalog.filters.fuels.${fuel}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ценовой диапазон */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('catalog.filters.priceRange')}
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {priceRange[1]}€/day
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Список автомобилей */}
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="relative w-full h-72 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/catalog/${car.id}`)}
                >
                  <LazyImage
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="relative mt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{car.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t(`catalog.categories.${car.category.toLowerCase()}`)}
                  </p>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCompare(car)
                    }}
                    className={`p-2 rounded-full shadow-sm ${
                      compareList.find(c => c.id === car.id)
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-white text-gray-400 hover:text-indigo-500'
                    } transition-colors duration-200`}
                  >
                    <ScaleIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">
                      <span className="text-gray-900 dark:text-white">{formatPrice(car.price)}</span>
                      <span className="text-gray-500 dark:text-gray-400">/{t('catalog.car.perDay')}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(car)
                      }}
                      disabled={!car.available || isInCart(car.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        !car.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isInCart(car.id)
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {!car.available
                        ? t('catalog.car.notAvailable')
                        : isInCart(car.id)
                        ? t('cart.inCart')
                        : t('catalog.car.book')}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">👥</span>
                    {car.specs.seats}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">⚙️</span>
                    {car.specs.transmission}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">⛽</span>
                    {car.specs.fuel}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📊</span>
                    {car.specs.consumption} L/100km
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {t(`features.${feature}`)}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{car.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Сообщение, если нет результатов */}
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {t('catalog.noResults')}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t('catalog.tryOtherFilters')}
              </p>
            </div>
          )}
        </div>

        {/* Компонент сравнения */}
        <CompareDrawer
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          cars={compareList}
          onRemove={handleRemoveFromCompare}
        />
      </div>
    </PageTransition>
  )
}

export default CatalogPage 