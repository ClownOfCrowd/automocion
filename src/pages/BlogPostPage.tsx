import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

interface BlogPostContent {
  title: string
  date: string
  image: string
  content: string[]
  category: string
  authorName: string
  authorImage: string
  relatedPosts: string[]
}

const BlogPostPage = () => {
  const { t } = useTranslation()
  const { postId } = useParams<{ postId: string }>()

  // Заглушка для данных статьи, в будущем можно добавить получение данных из API
  const getPostData = (id: string): BlogPostContent => {
    // В реальном приложении здесь будет загрузка контента статьи
    // для демонстрации используем заглушку
    return {
      title: t(`blog.posts.${id}.title`),
      date: t(`blog.posts.${id}.date`),
      image: `/images/blog/${id}.jpg`,
      content: Array.from({ length: 5 }, (_, i) => t(`blog.posts.${id}.content.${i}`)),
      category: t(`blog.posts.${id}.category`),
      authorName: t('blog.author.name'),
      authorImage: '/images/blog/author.jpg',
      relatedPosts: ['tarragona-coastal-route', 'barcelona-day-trip', 'portaventura-guide'].filter(p => p !== id).slice(0, 2)
    }
  }

  const post = getPostData(postId || 'tarragona-coastal-route')

  return (
    <PageTransition>
      <div className="bg-white dark:bg-premium-black">
        {/* Hero Section */}
        <div className="relative h-[350px] sm:h-[450px] lg:h-[550px]">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={post.image}
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-premium-black to-premium-black/20 mix-blend-multiply" />
          </div>
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
            <Link 
              to="/blog" 
              className="mb-8 flex items-center text-premium-silver hover:text-premium-gold transition-colors duration-300"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('blog.backToBlog')}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-premium-gold text-white px-3 py-1 text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-4 border-2 border-premium-gold"
                  src={post.authorImage}
                  alt={post.authorName}
                />
                <div>
                  <p className="text-white">{post.authorName}</p>
                  <p className="text-premium-silver text-sm">{post.date}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-premium-gold prose-a:text-premium-gold"
          >
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-premium-black dark:text-white mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12">
            <span className="text-sm text-premium-black dark:text-white font-medium mr-2">
              {t('blog.tags')}:
            </span>
            {['Tarragona', 'Travel', 'Routes', 'Spain', 'Tourism'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-premium-gold/10 text-premium-gold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-premium-black dark:text-white">
              {t('blog.share')}
            </h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-premium-gold transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-premium-gold transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-premium-gold transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-silver-gradient-1 dark:bg-premium-gradient-1 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-premium-black dark:text-white mb-8">
              {t('blog.relatedPosts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.relatedPosts.map((relatedPostId) => (
                <motion.div
                  key={relatedPostId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-premium-black border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-premium-gold/20 dark:hover:border-premium-gold/20 transition-all duration-300"
                >
                  <div className="flex">
                    <div className="w-40 h-full">
                      <img
                        src={`/images/blog/${relatedPostId}.jpg`}
                        alt={t(`blog.posts.${relatedPostId}.title`)}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <span className="inline-block text-xs font-medium text-premium-gold mb-2">
                        {t(`blog.posts.${relatedPostId}.category`)}
                      </span>
                      <Link to={`/blog/${relatedPostId}`} className="block mt-1">
                        <h3 className="text-lg font-semibold text-premium-black dark:text-white group-hover:text-premium-gold dark:group-hover:text-premium-gold transition-colors duration-300">
                          {t(`blog.posts.${relatedPostId}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {t(`blog.posts.${relatedPostId}.description`)}
                        </p>
                      </Link>
                      <div className="mt-4">
                        <Link
                          to={`/blog/${relatedPostId}`}
                          className="text-premium-gold hover:text-premium-gold/80 font-medium text-sm flex items-center"
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default BlogPostPage 