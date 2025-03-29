import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Helmet } from 'react-helmet'

interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  date: string
  category: string
  readTime: string
}

const NewsPage = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language || 'es'

  // Данные для новостей и статей, в будущем можно перенести в отдельный файл
  const newsArticles: NewsArticle[] = [
    {
      id: "best-car-travel-spain",
      title: t('news.articles.bestCarTravel.title'),
      description: t('news.articles.bestCarTravel.description'),
      image: "/images/news/spain-travel-car.jpg",
      date: "20.03.2025",
      category: t('news.categories.guides'),
      readTime: "7 мин"
    },
    {
      id: "economy-vs-premium",
      title: t('news.articles.economyVsPremium.title'),
      description: t('news.articles.economyVsPremium.description'),
      image: "/images/news/economy-vs-premium.jpg",
      date: "15.03.2025",
      category: t('news.categories.comparison'),
      readTime: "5 мин"
    },
    {
      id: "spain-road-rules",
      title: t('news.articles.spainRoadRules.title'),
      description: t('news.articles.spainRoadRules.description'),
      image: "/images/news/road-rules.jpg",
      date: "10.03.2025",
      category: t('news.categories.rules'),
      readTime: "8 мин"
    },
    {
      id: "car-rent-faq",
      title: t('news.articles.carRentFaq.title'),
      description: t('news.articles.carRentFaq.description'),
      image: "/images/news/car-rent-faq.jpg",
      date: "05.03.2025",
      category: t('news.categories.faq'),
      readTime: "10 мин"
    },
    {
      id: "summer-travel-cars",
      title: t('news.articles.summerTravelCars.title'),
      description: t('news.articles.summerTravelCars.description'),
      image: "/images/news/summer-cars.jpg",
      date: "01.03.2025",
      category: t('news.categories.seasonal'),
      readTime: "6 мин"
    },
    {
      id: "family-travel-advice",
      title: t('news.articles.familyTravel.title'),
      description: t('news.articles.familyTravel.description'),
      image: "/images/news/family-travel.jpg",
      date: "25.02.2025",
      category: t('news.categories.advice'),
      readTime: "9 мин"
    }
  ]

  // Создаем структурированные данные для JSON-LD
  const newsArticleListItems = newsArticles.map(article => ({
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description,
    "image": `https://www.ovautomocion.es${article.image}`,
    "datePublished": article.date.split('.').reverse().join('-'), // Преобразуем DD.MM.YYYY в YYYY-MM-DD
    "url": `https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}news/${article.id}`,
    "author": {
      "@type": "Organization",
      "name": "O.V. Automoción"
    },
    "publisher": {
      "@type": "Organization",
      "name": "O.V. Automoción",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ovautomocion.es/images/logo.png"
      }
    }
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": newsArticles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.description,
        "image": `https://www.ovautomocion.es${article.image}`,
        "datePublished": article.date.split('.').reverse().join('-'),
        "url": `https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}news/${article.id}`
      }
    }))
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{t('news.metaTitle', 'O.V. Automoción - Noticias y consejos sobre alquiler de coches')}</title>
        <meta name="description" content={t('news.metaDescription', 'Noticias, consejos y guías sobre alquiler de coches, normativa de tráfico, viajes en España y comparativas de vehículos para optimizar tu experiencia de alquiler.')} />
        <meta name="keywords" content={t('news.metaKeywords', 'noticias alquiler coches, consejos viaje coche, normativa trafico españa, comparativa coches alquiler, guia conduccion españa, recomendaciones alquiler vehiculo')} />
        <link rel="canonical" href={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}news`} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}news`} />
        <meta property="og:title" content={t('news.metaTitle', 'O.V. Automoción - Noticias y consejos sobre alquiler de coches')} />
        <meta property="og:description" content={t('news.metaDescription', 'Noticias, consejos y guías sobre alquiler de coches, normativa de tráfico, viajes en España y comparativas de vehículos para optimizar tu experiencia de alquiler.')} />
        <meta property="og:image" content="https://www.ovautomocion.es/images/news/news-hero.jpg" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}news`} />
        <meta property="twitter:title" content={t('news.metaTitle', 'O.V. Automoción - Noticias y consejos sobre alquiler de coches')} />
        <meta property="twitter:description" content={t('news.metaDescription', 'Noticias, consejos y guías sobre alquiler de coches, normativa de tráfico, viajes en España y comparativas de vehículos para optimizar tu experiencia de alquiler.')} />
        <meta property="twitter:image" content="https://www.ovautomocion.es/images/news/news-hero.jpg" />
        {/* Альтернативные языковые версии */}
        <link rel="alternate" hreflang="es" href="https://www.ovautomocion.es/news" />
        <link rel="alternate" hreflang="en" href="https://www.ovautomocion.es/en/news" />
        <link rel="alternate" hreflang="ru" href="https://www.ovautomocion.es/ru/news" />
        <link rel="alternate" hreflang="de" href="https://www.ovautomocion.es/de/news" />
        <link rel="alternate" hreflang="fr" href="https://www.ovautomocion.es/fr/news" />
        <link rel="alternate" hreflang="x-default" href="https://www.ovautomocion.es/news" />
        
        {/* JSON-LD структурированные данные */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="bg-white dark:bg-premium-black min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] bg-gradient-to-r from-premium-black to-premium-black/90">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover opacity-40"
              src="/images/news/news-hero.jpg"
              alt={t('news.title')}
            />
            <div className="absolute inset-0 bg-premium-black/60 mix-blend-multiply" />
          </div>
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-4"
            >
              <span className="text-premium-gold">{t('news.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 sm:mt-4 max-w-3xl text-base sm:text-lg text-premium-silver"
            >
              {t('news.subtitle')}
            </motion.p>
          </div>
        </div>

        {/* News Categories */}
        <div className="bg-silver-gradient-1 dark:bg-premium-gradient-1 py-4 shadow-md sticky top-16 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center overflow-x-auto hide-scrollbar space-x-4 py-1">
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-premium-gold text-white hover:bg-premium-gold/90 transition-colors whitespace-nowrap">
                {t('news.categories.all')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.guides')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.comparison')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.rules')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.faq')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.seasonal')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors whitespace-nowrap">
                {t('news.categories.advice')}
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="space-y-10">
                {/* Featured Article */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-premium-black"
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img 
                      src={newsArticles[0].image} 
                      alt={newsArticles[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 m-4">
                      <span className="bg-premium-gold text-white px-3 py-1 text-sm font-medium rounded">
                        {t('news.featured')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-premium-silver dark:text-gray-400">{newsArticles[0].date}</span>
                      <span className="text-sm px-2 py-1 bg-premium-gold/10 text-premium-gold rounded-full">{newsArticles[0].category}</span>
                      <span className="text-sm text-premium-silver dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {newsArticles[0].readTime}
                      </span>
                    </div>
                    
                    <Link to={`/news/${newsArticles[0].id}`}>
                      <h2 className="text-2xl font-bold text-premium-black dark:text-white hover:text-premium-gold dark:hover:text-premium-gold transition-colors duration-300">
                        {newsArticles[0].title}
                      </h2>
                    </Link>
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {newsArticles[0].description}
                    </p>
                    
                    <div className="mt-6">
                      <Link
                        to={`/news/${newsArticles[0].id}`}
                        className="inline-flex items-center px-4 py-2 bg-premium-gold text-white rounded-md hover:bg-premium-gold/90 transition-colors"
                      >
                        {t('news.readMore')}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Regular Articles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {newsArticles.slice(1).map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="group flex flex-col overflow-hidden rounded-lg shadow-md bg-white dark:bg-premium-black border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-premium-gold/20 dark:hover:border-premium-gold/20 transition-all duration-300"
                    >
                      <div className="relative aspect-w-16 aspect-h-9">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <span className="bg-premium-gold/90 text-white px-2 py-1 text-xs font-medium rounded">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-5">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-premium-silver dark:text-gray-400">{article.date}</span>
                            <span className="text-xs text-premium-silver dark:text-gray-400 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              {article.readTime}
                            </span>
                          </div>
                          <Link to={`/news/${article.id}`} className="block">
                            <h3 className="text-lg font-semibold text-premium-black dark:text-white group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors duration-300">
                              {article.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {article.description}
                            </p>
                          </Link>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                          <Link
                            to={`/news/${article.id}`}
                            className="text-premium-gold hover:text-premium-gold/80 text-sm font-medium flex items-center"
                          >
                            {t('news.readMore')}
                            <svg
                              className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="sticky top-32 space-y-8">
                {/* Search */}
                <div className="bg-white dark:bg-premium-black rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.search.title')}</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('news.search.placeholder')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-premium-black/80 text-premium-black dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-gold/50"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-premium-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white dark:bg-premium-black rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.popularCategories')}</h3>
                  <div className="space-y-2">
                    <Link to="/news?category=guides" className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 group">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">{t('news.categories.guides')}</span>
                      <span className="bg-premium-gold/10 text-premium-gold text-xs px-2 py-1 rounded-full">12</span>
                    </Link>
                    <Link to="/news?category=comparison" className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 group">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">{t('news.categories.comparison')}</span>
                      <span className="bg-premium-gold/10 text-premium-gold text-xs px-2 py-1 rounded-full">8</span>
                    </Link>
                    <Link to="/news?category=rules" className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 group">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">{t('news.categories.rules')}</span>
                      <span className="bg-premium-gold/10 text-premium-gold text-xs px-2 py-1 rounded-full">6</span>
                    </Link>
                    <Link to="/news?category=faq" className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 group">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">{t('news.categories.faq')}</span>
                      <span className="bg-premium-gold/10 text-premium-gold text-xs px-2 py-1 rounded-full">10</span>
                    </Link>
                    <Link to="/news?category=seasonal" className="flex items-center justify-between py-2 group">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors">{t('news.categories.seasonal')}</span>
                      <span className="bg-premium-gold/10 text-premium-gold text-xs px-2 py-1 rounded-full">4</span>
                    </Link>
                  </div>
                </div>

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

                {/* Popular Posts */}
                <div className="bg-white dark:bg-premium-black rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-premium-black dark:text-white mb-4">{t('news.popularPosts')}</h3>
                  <div className="space-y-4">
                    {newsArticles.slice(0, 3).map((article) => (
                      <Link key={article.id} to={`/news/${article.id}`} className="flex items-start space-x-3 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-premium-black dark:text-white group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-premium-silver dark:text-gray-400 mt-1">{article.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button className="px-3 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-premium-gold/10 hover:text-premium-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button className="px-3 py-1 rounded-md bg-premium-gold text-white">1</button>
              <button className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-premium-gold/10 hover:text-premium-gold transition-colors">2</button>
              <button className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-premium-gold/10 hover:text-premium-gold transition-colors">3</button>
              <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400">...</button>
              <button className="px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-premium-gold/10 hover:text-premium-gold transition-colors">8</button>
              <button className="px-3 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-premium-gold/10 hover:text-premium-gold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default NewsPage 