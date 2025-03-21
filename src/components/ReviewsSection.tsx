import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { reviews, Review } from '../data/reviews'
import { useTheme } from '../contexts/ThemeContext'

interface ReviewFormData {
  name: string
  rating: number
  comment: string
  car: string
}

const ReviewsSection = () => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 5,
    comment: '',
    car: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  // Определяем количество отзывов на слайд в зависимости от ширины экрана
  const [reviewsPerSlide, setReviewsPerSlide] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setReviewsPerSlide(1)
      } else if (window.innerWidth < 1024) { // tablet
        setReviewsPerSlide(2)
      } else { // desktop
        setReviewsPerSlide(3)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Автоматическая прокрутка (только если не перетаскивают)
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000) // Смена каждые 5 секунд

      return () => clearInterval(interval)
    }
  }, [currentSlide, isDragging])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowForm(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const approvedReviews = reviews.filter(review => review.status === 'approved')
  const totalSlides = Math.ceil(approvedReviews.length / reviewsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const delta = clientX - dragStart
    setDragOffset(delta)
  }

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <section className="relative py-24 bg-silver-radial dark:bg-premium-radial">
      <div className="absolute inset-0">
        <div className="bg-premium-silver-medium/20 dark:bg-premium-black-deep/20 w-full h-full"></div>
      </div>
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            <span className="text-premium-gold premium-text-shadow">{t('home.reviews.title')}</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-premium-silver">
            {t('home.reviews.description')}
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ 
                x: isDragging ? `calc(-${currentSlide * 100}% + ${dragOffset}px)` : `-${currentSlide * 100}%`
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                mass: 0.5
              }}
              className="flex touch-pan-y"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {approvedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  className={`w-full flex-shrink-0 px-4 ${
                    reviewsPerSlide === 3 ? 'md:w-1/3' : 
                    reviewsPerSlide === 2 ? 'md:w-1/2' : 'w-full'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="bg-silver-gradient-2 dark:bg-premium-gradient-1 p-6 rounded-lg border border-premium-silver-medium dark:border-premium-gold/20 h-full premium-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="ml-0">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{review.name}</h3>
                        <p className="text-sm text-gray-700 dark:text-premium-silver">{review.car}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-premium-gold' : (theme === 'dark' ? 'text-gray-600' : 'text-gray-400')
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-premium-silver leading-relaxed">{review.comment}</p>
                    <p className="mt-4 text-sm text-gray-500 dark:text-premium-silver/60">
                      {new Date(review.date).toLocaleDateString(review.language)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Навигация для десктопа */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-premium-silver-medium dark:bg-premium-black-elegant hover:bg-premium-gold/30 p-3 rounded-full backdrop-blur-sm transition-colors z-10 premium-shadow"
            >
              <svg className="h-6 w-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-premium-silver-medium dark:bg-premium-black-elegant hover:bg-premium-gold/30 p-3 rounded-full backdrop-blur-sm transition-colors z-10 premium-shadow"
            >
              <svg className="h-6 w-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Индикаторы слайдов */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 bg-premium-gold' 
                    : 'bg-premium-gold/30 hover:bg-premium-gold/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-8 py-4 border border-premium-gold text-base font-medium rounded-md text-white bg-premium-gold hover:bg-premium-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premium-gold shadow-lg transition-colors"
          >
            {t('home.reviews.addButton')}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`${theme === 'dark' ? 'bg-premium-black/90' : 'bg-silver-gradient-2'} backdrop-blur-lg rounded-lg p-6 max-w-md w-full border ${theme === 'dark' ? 'border-premium-gold/10' : 'border-premium-silver-medium'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t('home.reviews.form.title')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-premium-silver' : 'text-gray-700'} mb-1`}>
                      {t('home.reviews.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-md ${theme === 'dark' ? 'bg-white/5 border-premium-gold/20 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:border-premium-gold focus:ring-premium-gold`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-premium-silver' : 'text-gray-700'} mb-1`}>
                      {t('home.reviews.form.car')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.car}
                      onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                      className={`w-full rounded-md ${theme === 'dark' ? 'bg-white/5 border-premium-gold/20 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:border-premium-gold focus:ring-premium-gold`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-premium-silver' : 'text-gray-700'} mb-1`}>
                      {t('home.reviews.form.rating')}
                    </label>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            rating <= formData.rating ? 'text-premium-gold' : (theme === 'dark' ? 'text-gray-600' : 'text-gray-400')
                          }`}
                          onClick={() => setFormData({ ...formData, rating })}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-premium-silver' : 'text-gray-700'} mb-1`}>
                      {t('home.reviews.form.comment')}
                    </label>
                    <textarea
                      required
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={4}
                      className={`w-full rounded-md ${theme === 'dark' ? 'bg-white/5 border-premium-gold/20 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:border-premium-gold focus:ring-premium-gold`}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className={`px-4 py-2 border ${theme === 'dark' ? 'border-premium-gold/20 text-premium-silver hover:bg-premium-gold/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded-md transition-colors`}
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-premium-gold text-white rounded-md hover:bg-premium-gold/90 transition-colors"
                    >
                      {t('home.reviews.form.submit')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed bottom-4 right-4 ${theme === 'dark' ? 'bg-premium-gold/20 border-premium-gold/30 text-white' : 'bg-premium-gold/10 border-premium-gold/20 text-gray-800'} backdrop-blur-sm border px-6 py-4 rounded-lg z-50`}
            >
              <p>{t('home.reviews.success')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ReviewsSection