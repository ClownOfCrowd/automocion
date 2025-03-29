import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

interface BlogPost {
  id: string
  title: string
  description: string
  image: string
  date: string
  category: string
}

const BlogPage = () => {
  const { t } = useTranslation()

  // Временные данные для блога, в будущем можно перенести в отдельный файл
  const blogPosts: BlogPost[] = [
    {
      id: "tarragona-coastal-route",
      title: t('blog.posts.tarragonaCoast.title'),
      description: t('blog.posts.tarragonaCoast.description'),
      image: "/images/blog/tarragona-coast.jpg",
      date: t('blog.posts.tarragonaCoast.date'),
      category: t('blog.categories.routes')
    },
    {
      id: "barcelona-day-trip",
      title: t('blog.posts.barcelonaDayTrip.title'),
      description: t('blog.posts.barcelonaDayTrip.description'),
      image: "/images/blog/barcelona-trip.jpg",
      date: t('blog.posts.barcelonaDayTrip.date'),
      category: t('blog.categories.dayTrips')
    },
    {
      id: "portaventura-guide",
      title: t('blog.posts.portaventuraGuide.title'),
      description: t('blog.posts.portaventuraGuide.description'),
      image: "/images/blog/portaventura.jpg",
      date: t('blog.posts.portaventuraGuide.date'),
      category: t('blog.categories.attractions')
    },
    {
      id: "wineries-tour",
      title: t('blog.posts.wineriesTour.title'),
      description: t('blog.posts.wineriesTour.description'),
      image: "/images/blog/wineries.jpg",
      date: t('blog.posts.wineriesTour.date'),
      category: t('blog.categories.gastronomy')
    },
    {
      id: "delta-ebro-nature",
      title: t('blog.posts.deltaEbro.title'),
      description: t('blog.posts.deltaEbro.description'),
      image: "/images/blog/delta-ebro.jpg",
      date: t('blog.posts.deltaEbro.date'),
      category: t('blog.categories.nature')
    },
    {
      id: "roman-tarragona",
      title: t('blog.posts.romanTarragona.title'),
      description: t('blog.posts.romanTarragona.description'),
      image: "/images/blog/roman-tarragona.jpg",
      date: t('blog.posts.romanTarragona.date'),
      category: t('blog.categories.culture')
    }
  ]

  return (
    <PageTransition>
      <div className="bg-white dark:bg-premium-black">
        {/* Hero Section */}
        <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] bg-gradient-to-r from-premium-black to-premium-black/90">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover opacity-40"
              src="/images/blog/blog-hero.jpg"
              alt={t('blog.title')}
            />
            <div className="absolute inset-0 bg-premium-black/50 mix-blend-multiply" />
          </div>
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white mb-2 sm:mb-4"
            >
              <span className="text-premium-gold">{t('blog.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 sm:mt-6 max-w-3xl text-base sm:text-xl text-premium-silver"
            >
              {t('blog.subtitle')}
            </motion.p>
          </div>
        </div>

        {/* Blog Category Tabs */}
        <div className="bg-silver-gradient-1 dark:bg-premium-gradient-1 py-4 shadow-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-premium-gold text-white hover:bg-premium-gold/90 transition-colors">
                {t('blog.categories.all')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                {t('blog.categories.routes')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                {t('blog.categories.attractions')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                {t('blog.categories.dayTrips')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                {t('blog.categories.gastronomy')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 dark:bg-white/5 text-premium-black dark:text-white hover:bg-premium-gold/10 dark:hover:bg-premium-gold/10 hover:text-premium-gold dark:hover:text-premium-gold transition-colors">
                {t('blog.categories.culture')}
              </button>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-premium-black border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-premium-gold/20 dark:hover:border-premium-gold/20 transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-premium-gold text-white px-2 py-1 text-xs font-medium m-2 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <p className="text-sm text-premium-silver mb-2">{post.date}</p>
                    <Link to={`/blog/${post.id}`} className="block mt-2">
                      <h3 className="text-xl font-semibold text-premium-black dark:text-white group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-premium-gold hover:text-premium-gold/80 font-medium flex items-center"
                    >
                      {t('blog.readMore')}
                      <svg
                        className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300"
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

        {/* Newsletter Sign-up */}
        <div className="bg-silver-gradient-1 dark:bg-premium-gradient-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="rounded-2xl bg-premium-gold/10 dark:bg-premium-gold/5 px-6 py-10 sm:py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-premium-black dark:text-white">
                  {t('blog.newsletter.title')}
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
                  {t('blog.newsletter.description')}
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    {t('blog.newsletter.emailLabel')}
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border-0 bg-white/90 dark:bg-premium-black/50 px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                    placeholder={t('blog.newsletter.emailPlaceholder')}
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-premium-gold px-5 py-3 text-base font-medium text-white hover:bg-premium-gold/90 focus:outline-none focus:ring-2 focus:ring-premium-gold"
                    >
                      {t('blog.newsletter.subscribe')}
                    </motion.button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {t('blog.newsletter.privacy')}{' '}
                  <Link to="/privacy" className="font-medium text-premium-gold underline">
                    {t('blog.newsletter.privacyLink')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default BlogPage 