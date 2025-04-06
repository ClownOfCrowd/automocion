import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  AdjustmentsHorizontalIcon, 
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { cars } from '../data/cars'
import LazyImage from '../components/LazyImage'
import PageTransition from '../components/PageTransition'
import { Helmet } from 'react-helmet-async'

interface Filters {
  category: string
  transmission: string
  fuel: string
  priceRange: number
  search: string
  all: boolean
}

const CatalogPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const currentLanguage = i18n.language || 'es'
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('price-asc')
  
  // Получаем параметры из URL или из состояния навигации
  const queryParams = new URLSearchParams(location.search)
  const locationState = location.state as { booking?: any, filters?: any } || {}
  
  // По умолчанию показываем все машины, если в URL нет явного указания обратного
  const showAll = queryParams.has('all') ? queryParams.get('all') === '1' : true
  
  const [filters, setFilters] = useState<Filters>({
    category: queryParams.get('category') || locationState?.filters?.category || 'All',
    transmission: queryParams.get('transmission') || locationState?.filters?.transmission || 'All',
    fuel: queryParams.get('fuel') || locationState?.filters?.fuel || 'All',
    priceRange: Number(queryParams.get('priceRange')) || locationState?.filters?.priceRange || 200,
    search: queryParams.get('search') || locationState?.filters?.search || '',
    all: showAll
  })

  // При первом рендере, если all=true, добавляем в URL параметр all=1
  useEffect(() => {
    if (filters.all && !queryParams.has('all')) {
      const newParams = new URLSearchParams(location.search)
      newParams.set('all', '1')
      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true })
    }
  }, [])

  // Фильтрация автомобилей
  const filteredCars = cars.filter(car => {
    // Если параметр all=1, показываем все автомобили
    if (filters.all) return true
    
    if (filters.category !== 'All' && car.category !== filters.category) return false
    if (filters.transmission !== 'All' && car.transmission !== filters.transmission) return false
    if (filters.fuel !== 'All' && car.fuel !== filters.fuel) return false
    if (car.price > filters.priceRange) return false
    if (filters.search && !car.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  // Сортировка автомобилей
  const sortedCars = [...filteredCars].sort((a, b) => {
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

  const handleFilterChange = (key: keyof Filters, value: string | number | boolean) => {
    // Обновляем состояние фильтров
    setFilters(prev => ({ ...prev, [key]: value }))
    
    // Обновляем URL с учетом изменений
    const newParams = new URLSearchParams(location.search)
    
    if (key === 'all') {
      if (value === true) {
        newParams.set('all', '1')
      } else {
        newParams.delete('all')
      }
    } else {
      // Если изменяется другой фильтр, обновляем соответствующий параметр
      if (key === 'category' || key === 'transmission' || key === 'fuel') {
        if (value === 'All') {
          newParams.delete(key)
        } else {
          newParams.set(key, value.toString())
        }
      } else if (key === 'priceRange') {
        if (value === 200) {
          newParams.delete(key)
        } else {
          newParams.set(key, value.toString())
        }
      } else if (key === 'search') {
        if (!value) {
          newParams.delete(key)
        } else {
          newParams.set(key, value.toString())
        }
      }
    }
    
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const resetFilters = () => {
    setFilters({
      category: 'All',
      transmission: 'All',
      fuel: 'All',
      priceRange: 200,
      search: '',
      all: true // При сбросе фильтров также показываем все автомобили
    })
    
    // Обновляем URL только с параметром all=1
    navigate(`${location.pathname}?all=1`, { replace: true })
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{t('catalog.title', 'Catálogo de Coches')} | O.V. Automoción</title>
        <meta name="description" content={t('catalog.metaDescription', 'Explora nuestra amplia selección de vehículos de alquiler, desde económicos hasta premium. Encuentra el coche perfecto para tus necesidades en Vila-seca, Tarragona.')} />
        <meta name="keywords" content={t('catalog.metaKeywords', 'alquiler coches Vila-seca, catalogo vehiculos, coches disponibles, SUV, economicos, premium')} />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}catalog${location.search}`} />
        <meta property="og:title" content={`${t('catalog.title', 'Catálogo de Coches')} | O.V. Automoción`} />
        <meta property="og:description" content={t('catalog.metaDescription', 'Explora nuestra amplia selección de vehículos de alquiler, desde económicos hasta premium. Encuentra el coche perfecto para tus necesidades en Vila-seca, Tarragona.')} />
        <meta property="og:image" content="https://www.ovautomocion.es/images/hero/catalog-hero.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}catalog${location.search}`} />
        <meta property="twitter:title" content={`${t('catalog.title', 'Catálogo de Coches')} | O.V. Automoción`} />
        <meta property="twitter:description" content={t('catalog.metaDescription', 'Explora nuestra amplia selección de vehículos de alquiler, desde económicos hasta premium. Encuentra el coche perfecto para tus necesidades en Vila-seca, Tarragona.')} />
        <meta property="twitter:image" content="https://www.ovautomocion.es/images/hero/catalog-hero.jpg" />
        
        {/* Альтернативные языковые версии */}
        <link rel="alternate" hreflang="es" href={`https://www.ovautomocion.es/catalog${location.search}`} />
        <link rel="alternate" hreflang="en" href={`https://www.ovautomocion.es/en/catalog${location.search}`} />
        <link rel="alternate" hreflang="de" href={`https://www.ovautomocion.es/de/catalog${location.search}`} />
        <link rel="alternate" hreflang="fr" href={`https://www.ovautomocion.es/fr/catalog${location.search}`} />
        <link rel="alternate" hreflang="ru" href={`https://www.ovautomocion.es/ru/catalog${location.search}`} />
        <link rel="alternate" hreflang="x-default" href={`https://www.ovautomocion.es/catalog${location.search}`} />
        
        {/* JSON-LD структурированные данные */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredCars.map((car, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": car.name,
                "image": `https://www.ovautomocion.es${car.image}`,
                "description": t(car.description),
                "offers": {
                  "@type": "Offer",
                  "url": `https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}catalog/${car.id}`,
                  "priceCurrency": "EUR",
                  "price": car.price,
                  "availability": "https://schema.org/InStock"
                }
              }
            }))
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-premium-black">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-premium-black to-premium-black/90">
          <div className="absolute inset-0">
            <img
              src="/images/hero/catalog-hero.jpg"
              alt="Luxury cars"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                <span className="text-premium-gold">{t('catalog.title')}</span>
              </h1>
              <p className="text-xl text-premium-silver mb-8">
                {t('home.hero.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="py-12 bg-gray-50 dark:bg-premium-black/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Mobile Toggle */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center space-x-2 bg-white dark:bg-premium-black p-3 rounded-md shadow-sm"
                >
                  <FunnelIcon className="h-5 w-5 text-premium-gold" />
                  <span className="text-premium-black dark:text-white">{t('catalog.filters.title')}</span>
                </button>
                <div>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="bg-white dark:bg-premium-black border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-premium-black dark:text-white"
                  >
                    <option value="price-asc">{t('catalog.sort.price-asc')}</option>
                    <option value="price-desc">{t('catalog.sort.price-desc')}</option>
                    <option value="name-asc">{t('catalog.sort.name-asc')}</option>
                    <option value="name-desc">{t('catalog.sort.name-desc')}</option>
                  </select>
                </div>
              </div>

              {/* Filters - Sidebar */}
              <div className={`lg:w-1/4 ${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="bg-white dark:bg-premium-black p-6 rounded-lg shadow-md sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-premium-black dark:text-white flex items-center">
                      <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-premium-gold" />
                      {t('catalog.filters.title')}
                    </h2>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-premium-gold hover:text-premium-gold/80"
                    >
                      {t('common.reset')}
                    </button>
                    <button
                      className="lg:hidden"
                      onClick={() => setIsFiltersOpen(false)}
                    >
                      <XMarkIcon className="h-5 w-5 text-premium-black dark:text-white" />
                    </button>
                  </div>

                  {/* Show All Vehicles */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="show-all"
                        checked={filters.all}
                        onChange={() => handleFilterChange('all', !filters.all)}
                        className="h-4 w-4 text-premium-gold focus:ring-premium-gold border-gray-300 rounded"
                      />
                      <label
                        htmlFor="show-all"
                        className="ml-2 text-sm font-medium text-premium-black dark:text-white"
                      >
                        {t('catalog.showAll')}
                      </label>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-premium-black dark:text-white mb-3">
                      {t('catalog.filters.category')}
                    </h3>
                    <div className="space-y-2">
                      {['All', 'Premium', 'SUV', 'Compact', 'Electric'].map(category => (
                        <div key={category} className="flex items-center">
                          <input
                            type="radio"
                            id={`category-${category}`}
                            name="category"
                            checked={filters.category === category}
                            onChange={() => handleFilterChange('category', category)}
                            className="h-4 w-4 text-premium-gold focus:ring-premium-gold border-gray-300"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm text-gray-700 dark:text-premium-silver"
                          >
                            {t(`catalog.categories.${category.toLowerCase()}`)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transmission Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-premium-black dark:text-white mb-3">
                      {t('catalog.filters.transmission')}
                    </h3>
                    <div className="space-y-2">
                      {['All', 'Manual', 'Automático'].map(transmission => (
                        <div key={transmission} className="flex items-center">
                          <input
                            type="radio"
                            id={`transmission-${transmission}`}
                            name="transmission"
                            checked={filters.transmission === transmission}
                            onChange={() => handleFilterChange('transmission', transmission)}
                            className="h-4 w-4 text-premium-gold focus:ring-premium-gold border-gray-300"
                          />
                          <label
                            htmlFor={`transmission-${transmission}`}
                            className="ml-2 text-sm text-gray-700 dark:text-premium-silver"
                          >
                            {transmission === 'All' ? t('catalog.categories.all') : transmission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-premium-black dark:text-white mb-3">
                      {t('catalog.filters.fuel')}
                    </h3>
                    <div className="space-y-2">
                      {['All', 'Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'].map(fuel => (
                        <div key={fuel} className="flex items-center">
                          <input
                            type="radio"
                            id={`fuel-${fuel}`}
                            name="fuel"
                            checked={filters.fuel === fuel}
                            onChange={() => handleFilterChange('fuel', fuel)}
                            className="h-4 w-4 text-premium-gold focus:ring-premium-gold border-gray-300"
                          />
                          <label
                            htmlFor={`fuel-${fuel}`}
                            className="ml-2 text-sm text-gray-700 dark:text-premium-silver"
                          >
                            {fuel === 'All' ? t('catalog.categories.all') : fuel}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-premium-black dark:text-white mb-3">
                      {t('catalog.filters.priceRange')}
                    </h3>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="range"
                        min="30"
                        max="400"
                        step="10"
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-premium-gold"
                      />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-premium-silver">30€</span>
                        <span className="text-sm text-gray-700 dark:text-premium-silver">{filters.priceRange}€</span>
                        <span className="text-sm text-gray-700 dark:text-premium-silver">400€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Car List */}
              <div className="lg:w-3/4">
                {/* Sort - Desktop */}
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <p className="text-premium-black dark:text-white">
                    {t('catalog.showing')} <span className="font-semibold">{sortedCars.length}</span> {t('catalog.vehicles')}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-premium-black dark:text-white">{t('catalog.sortBy')}</span>
                    <select
                      value={sortBy}
                      onChange={handleSortChange}
                      className="bg-white dark:bg-premium-black border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-premium-black dark:text-white"
                    >
                      <option value="price-asc">{t('catalog.sort.price-asc')}</option>
                      <option value="price-desc">{t('catalog.sort.price-desc')}</option>
                      <option value="name-asc">{t('catalog.sort.name-asc')}</option>
                      <option value="name-desc">{t('catalog.sort.name-desc')}</option>
                    </select>
                  </div>
                </div>

                {/* Car Grid */}
                {sortedCars.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCars.map((car) => (
                      <motion.div
                        key={car.id}
                        className="bg-white dark:bg-premium-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative h-48">
                          <LazyImage
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full"
                            objectFit="contain"
                            maxHeight={180}
                          />
                          <div className="absolute top-4 right-4 bg-premium-gold text-white px-4 py-1 rounded-full text-sm">
                            {t('common.fromPrice', { price: car.price })}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{car.name}</h3>
                          <p className="text-gray-600 dark:text-premium-silver mb-4">{t(car.description)}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-premium-silver">
                              <span className="mr-1">🚘</span>
                              {car.transmission}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-premium-silver">
                              <span className="mr-1">⛽</span>
                              {car.fuel}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-premium-silver">
                              <span className="mr-1">👥</span>
                              {car.seats} {t('catalog.car.seats')}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-premium-silver">
                              <span className="mr-1">🧳</span>
                              {car.luggage} {t('catalog.luggage')}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => navigate(`/catalog/${car.id}`)}
                            className="w-full bg-premium-black hover:bg-premium-black/90 text-white dark:bg-premium-gold dark:hover:bg-premium-gold/90 font-bold py-3 px-4 rounded-md transition-colors"
                          >
                            {t('common.bookNow')}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-premium-black p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-premium-black dark:text-white mb-2">
                      {t('catalog.noResults')}
                    </h3>
                    <p className="text-gray-600 dark:text-premium-silver mb-4">
                      {t('catalog.tryOtherFilters')}
                    </p>
                    <button
                      onClick={resetFilters}
                      className="bg-premium-gold hover:bg-premium-gold/90 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      {t('common.reset')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default CatalogPage 