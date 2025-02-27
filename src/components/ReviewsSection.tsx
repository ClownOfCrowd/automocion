import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { reviews, Review } from '../data/reviews'

interface ReviewFormData {
  name: string
  rating: number
  comment: string
  car: string
}

const ReviewsSection = () => {
  const { t, i18n } = useTranslation()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 5,
    comment: '',
    car: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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

  // Автоматическая прокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 10000) // Смена каждые 10 секунд

    return () => clearInterval(interval)
  }, [currentSlide])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки отзыва на бэкенд
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

  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t('home.reviews.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            {t('home.reviews.description')}
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
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
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.car}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString(review.language)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 z-10 text-gray-800 dark:text-white"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 z-10 text-gray-800 dark:text-white"
          >
            →
          </button>

          {/* Индикаторы слайдов */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('home.reviews.addButton')}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('home.reviews.form.title')}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('home.reviews.form.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('home.reviews.form.car')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.car}
                        onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('home.reviews.form.rating')}
                      </label>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`h-6 w-6 cursor-pointer ${
                              rating <= formData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                            onClick={() => setFormData({ ...formData, rating })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('home.reviews.form.comment')}
                      </label>
                      <textarea
                        required
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded z-50"
            >
              <p>{t('home.reviews.success')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReviewsSection 