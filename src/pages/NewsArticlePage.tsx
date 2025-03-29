import { useTranslation } from 'react-i18next'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'

const NewsArticlePage = () => {
  const { t } = useTranslation()
  const { articleId } = useParams<{ articleId: string }>()
  const navigate = useNavigate()

  // В реальном приложении здесь был бы запрос к API или импорт из файла данных
  // Временные моковые данные для демонстрации
  const articles = {
    'best-car-travel-spain': {
      title: t('news.articles.bestCarTravel.title'),
      description: t('news.articles.bestCarTravel.description'),
      image: '/images/news/spain-travel-car.jpg',
      date: '20.03.2025',
      category: t('news.categories.guides'),
      readTime: '7 мин',
      author: 'OV Automoción',
      content: [
        t('news.articles.bestCarTravel.content.0'),
        t('news.articles.bestCarTravel.content.1'),
        t('news.articles.bestCarTravel.content.2'),
        t('news.articles.bestCarTravel.content.3'),
        t('news.articles.bestCarTravel.content.4')
      ],
      tags: ['путешествия', 'аренда авто', 'испания', 'каталония']
    },
    'economy-vs-premium': {
      title: t('news.articles.economyVsPremium.title'),
      description: t('news.articles.economyVsPremium.description'),
      image: '/images/news/economy-vs-premium.jpg',
      date: '15.03.2025',
      category: t('news.categories.comparison'),
      readTime: '5 мин',
      author: 'OV Automoción',
      content: [
        t('news.articles.economyVsPremium.content.0'),
        t('news.articles.economyVsPremium.content.1'),
        t('news.articles.economyVsPremium.content.2'),
        t('news.articles.economyVsPremium.content.3')
      ],
      tags: ['эконом авто', 'премиум авто', 'сравнение', 'выбор автомобиля']
    },
    'spain-road-rules': {
      title: t('news.articles.spainRoadRules.title'),
      description: t('news.articles.spainRoadRules.description'),
      image: '/images/news/road-rules.jpg',
      date: '10.03.2025',
      category: t('news.categories.rules'),
      readTime: '8 мин',
      author: 'OV Automoción',
      content: [
        t('news.articles.spainRoadRules.content.0'),
        t('news.articles.spainRoadRules.content.1'),
        t('news.articles.spainRoadRules.content.2'),
        t('news.articles.spainRoadRules.content.3')
      ],
      tags: ['ПДД Испании', 'вождение в Испании', 'правила дорожного движения', 'дорожные знаки']
    }
  }

  const article = articles[articleId as keyof typeof articles]

  // Если статья не найдена, перенаправляем на страницу новостей
  useEffect(() => {
    if (!article && articleId) {
      navigate('/news')
    }
  }, [article, articleId, navigate])

  if (!article) {
    return null
  }

  // Рекомендуемые статьи (в реальном приложении нужно будет реализовать алгоритм подбора по тегам/категориям)
  const relatedArticles = Object.entries(articles)
    .filter(([id]) => id !== articleId)
    .map(([id, data]) => ({ id, ...data }))
    .slice(0, 2)

  return (
    <PageTransition>
      <div className="bg-white dark:bg-premium-black">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={article.image}
              alt={article.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-premium-black/50 to-transparent" />
          </div>
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link 
                to="/news"
                className="inline-flex items-center text-white hover:text-premium-gold transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {t('news.backToNews')}
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-white px-2 py-1 bg-premium-gold/80 rounded-full">
                {article.category}
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 max-w-3xl"
            >
              {article.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-sm">{article.date}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm">{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span className="text-sm">{article.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="prose dark:prose-invert prose-lg max-w-none">
                {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link 
                      key={tag} 
                      to={`/news?tag=${tag}`} 
                      className="px-3 py-1 bg-premium-gold/10 dark:bg-premium-gold/5 text-premium-gold rounded-full text-sm hover:bg-premium-gold/20 dark:hover:bg-premium-gold/10 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.share')}</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white dark:bg-premium-black/80 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white dark:bg-premium-black/80 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white dark:bg-premium-black/80 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white dark:bg-premium-black/80 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-10 lg:mt-0">
              <div className="sticky top-32 space-y-8">
                {/* Newsletter */}
                <div className="bg-premium-gold/10 dark:bg-premium-gold/5 rounded-lg shadow-md p-5 border border-premium-gold/20">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-2">{t('news.newsletter.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('news.newsletter.description')}</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder={t('news.newsletter.placeholder')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-premium-black/80 text-premium-black dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-gold/50"
                    />
                    <button className="w-full bg-premium-gold text-white py-2 rounded-lg hover:bg-premium-gold/90 transition-colors">
                      {t('news.newsletter.subscribe')}
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('news.newsletter.privacy')} <Link to="/privacy" className="text-premium-gold hover:underline">{t('news.newsletter.privacyLink')}</Link>
                    </p>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-white dark:bg-premium-black rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.relatedArticles')}</h3>
                  <div className="space-y-6">
                    {relatedArticles.map((relArticle) => (
                      <div key={relArticle.id} className="group">
                        <Link to={`/news/${relArticle.id}`} className="block aspect-w-16 aspect-h-9 overflow-hidden rounded-lg mb-3">
                          <img 
                            src={relArticle.image} 
                            alt={relArticle.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div>
                          <Link to={`/news/${relArticle.id}`}>
                            <h4 className="text-base font-medium text-premium-black dark:text-white group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">
                              {relArticle.title}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-3 mt-2 text-sm text-premium-silver dark:text-gray-400">
                            <span>{relArticle.date}</span>
                            <span>·</span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              {relArticle.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white dark:bg-premium-black rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.categories.title')}</h3>
                  <div className="space-y-1">
                    <Link to="/news" className="block py-2 text-premium-gold hover:text-premium-gold/80 transition-colors">
                      {t('news.categories.all')}
                    </Link>
                    <Link to="/news?category=guides" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.guides')}
                    </Link>
                    <Link to="/news?category=comparison" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.comparison')}
                    </Link>
                    <Link to="/news?category=rules" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.rules')}
                    </Link>
                    <Link to="/news?category=faq" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.faq')}
                    </Link>
                    <Link to="/news?category=seasonal" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.seasonal')}
                    </Link>
                    <Link to="/news?category=advice" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                      {t('news.categories.advice')}
                    </Link>
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

export default NewsArticlePage 