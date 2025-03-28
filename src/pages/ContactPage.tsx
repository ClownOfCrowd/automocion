import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

const ContactPage = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log('Form submitted:', form)
  }

  return (
    <PageTransition>
      <div className="bg-white dark:bg-premium-black">
        {/* Hero Section */}
        <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] bg-gradient-to-r from-premium-black to-premium-black/90">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover opacity-50"
              src="/images/contact-hero.jpg"
              alt={t('contact.title')}
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
              <span className="text-premium-gold">{t('contact.title')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 sm:mt-6 max-w-3xl text-base sm:text-xl text-premium-silver"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-premium-black">
          <div className="mx-auto max-w-7xl py-8 sm:py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:gap-16 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-premium-black/5 to-premium-black/10 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-8 rounded-lg shadow-xl border border-premium-gold/10">
                <div className="space-y-8 sm:space-y-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-premium-gold dark:text-premium-gold">
                      {t('contact.info.title')}
                    </h2>
                    <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                      <motion.div 
                        className="flex group"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-premium-black/5 dark:bg-premium-black rounded-full group-hover:bg-premium-gold/10 transition-colors duration-300">
                            <svg className="h-6 w-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-medium text-premium-black dark:text-white">+34 671 332 591 (esp/eng)</p>
                          <p className="mt-1 text-premium-black dark:text-premium-silver">{t('contact.info.schedule')}</p>
                          <p className="text-premium-black dark:text-premium-silver">{t('contact.info.workdays')}</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex group"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-premium-black/5 dark:bg-premium-black rounded-full group-hover:bg-premium-gold/10 transition-colors duration-300">
                            <svg className="h-6 w-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-medium text-premium-black dark:text-white">+34 647 030 703 (rus/ua)</p>
                          <p className="mt-1 text-premium-black dark:text-premium-silver">{t('contact.info.schedule')}</p>
                          <p className="text-premium-black dark:text-premium-silver">{t('contact.info.workdays')}</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex group"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-premium-black/5 dark:bg-premium-black rounded-full group-hover:bg-premium-gold/10 transition-colors duration-300">
                            <svg className="h-6 w-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-medium text-premium-black dark:text-white">{t('contact.info.address')}</p>
                          <p className="mt-1 text-premium-black dark:text-premium-silver">{t('contact.info.location')}</p>
                          <p className="text-premium-black dark:text-premium-silver">{t('contact.info.postal')}</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-8 border-t border-premium-gold/10"
                  >
                    <h2 className="text-2xl font-bold tracking-tight text-premium-gold dark:text-premium-gold">
                      {t('contact.social.title')}
                    </h2>
                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-4 sm:gap-8">
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="https://www.instagram.com/o.v.auto_mocion/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-premium-gold hover:text-premium-gold/80 transition-colors duration-300"
                      >
                        <span className="sr-only">{t('contact.social.instagram')}</span>
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="https://wa.me/34647030703" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-premium-gold hover:text-premium-gold/80 transition-colors duration-300"
                      >
                        <span className="sr-only">{t('contact.social.whatsapp')}</span>
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-xl border border-premium-gold/10"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-premium-black dark:text-premium-silver">
                      {t('contact.form.name')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-premium-gold focus:ring-premium-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-premium-black dark:text-premium-silver">
                      {t('contact.form.email')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-premium-gold focus:ring-premium-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-premium-black dark:text-premium-silver">
                      {t('contact.form.phone')}
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-premium-gold focus:ring-premium-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-premium-black dark:text-premium-silver">
                      {t('contact.form.message')}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-premium-gold focus:ring-premium-gold"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-premium-gold py-3 px-6 text-base font-medium text-white shadow-xl hover:bg-premium-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premium-gold transition-colors duration-300"
                  >
                    {t('contact.form.submit')}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-96 w-full border-t border-premium-gold/10"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.0475006453584!2d1.1198344!3d41.1198312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a156a2f0693755%3A0x76707a66a020bc14!2sCarrer%20del%20Mas%20de%20l&#39;Abat%2C%20145F%2C%2043480%20Vila-seca%2C%20Tarragona!5e0!3m2!1sen!2ses!4v1708532511893!5m2!1sen!2ses"
            width="100%"
            height="100%"
            title="O.V. Automoción office location"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            importance="high"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
          >
            <a href="https://maps.google.com/maps?q=Carrer+del+Mas+de+l'Abat,+145F,+43480+Vila-seca,+Tarragona&hl=en&t=m&z=14" target="_blank" rel="noopener noreferrer">
              {t('contact.info.address')}, {t('contact.info.location')}, {t('contact.info.postal')}
            </a>
          </iframe>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default ContactPage 