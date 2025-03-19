import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/animations'

const PrivacyPage = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-premium-black to-premium-black/90 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold text-white mb-4"
          >
            {t('privacy.title', 'Privacy Policy')}
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-premium-silver"
          >
            {t('privacy.subtitle', 'How we protect and use your data')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert max-w-none">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.company.title', 'Company Information')}</h2>
              <p>{t('privacy.company.name', 'Company Name')}: OV Automoción</p>
              <p>{t('privacy.company.address', 'Registered Address')}:<br />
                Carrer Mas del L Abat, 145F<br />
                Poligono Ind. Alba<br />
                43480-Vilaseca<br />
                TARRAGONA
              </p>
              <p>{t('privacy.company.email', 'Email')}: ovautomocion@gmail.com</p>
              <p>{t('privacy.company.id', 'Company ID')}: IX8855040V</p>
              <p>{t('privacy.company.vat', 'VAT Number')}: X8855040V</p>
              <p>{t('privacy.company.authority', 'Regulatory Authority')}: España</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataCollection.title', 'Data Collection')}</h2>
              <p>{t('privacy.dataCollection.description', 'We collect and process your personal data for the following purposes:')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.dataCollection.booking', 'Processing your car rental bookings')}</li>
                <li>{t('privacy.dataCollection.communication', 'Communicating with you about your rentals')}</li>
                <li>{t('privacy.dataCollection.legal', 'Complying with legal requirements')}</li>
                <li>{t('privacy.dataCollection.improvement', 'Improving our services')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataProtection.title', 'Data Protection')}</h2>
              <p>{t('privacy.dataProtection.description', 'We implement appropriate technical and organizational measures to ensure the security of your personal data, including:')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.dataProtection.encryption', 'Data encryption')}</li>
                <li>{t('privacy.dataProtection.access', 'Limited access to personal information')}</li>
                <li>{t('privacy.dataProtection.monitoring', 'Regular security monitoring')}</li>
                <li>{t('privacy.dataProtection.training', 'Staff training on data protection')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title', 'Use of Cookies')}</h2>
              <p>{t('privacy.cookies.description', 'Our website uses cookies to enhance your browsing experience. These cookies may include:')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.cookies.essential', 'Essential cookies for website functionality')}</li>
                <li>{t('privacy.cookies.analytics', 'Analytics cookies to improve our service')}</li>
                <li>{t('privacy.cookies.preferences', 'Preference cookies to remember your settings')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title', 'Your Rights')}</h2>
              <p>{t('privacy.rights.description', 'We are here to help you with your data. You can:')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.rights.access', 'Request a copy of your data')}</li>
                <li>{t('privacy.rights.correct', 'Correct inaccurate information')}</li>
                <li>{t('privacy.rights.delete', 'Delete your data')}</li>
                <li>{t('privacy.rights.transfer', 'Transfer your data to another company')}</li>
                <li>{t('privacy.rights.object', 'Object to data processing')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title', 'Contact Us')}</h2>
              <p>{t('privacy.contact.description', 'For any privacy-related queries or to exercise your rights, please contact us at:')}</p>
              <p className="mt-2">Email: ovautomocion@gmail.com</p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage 