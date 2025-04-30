import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/animations'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEO/SEOHead'

const PrivacyPage = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language || 'es'

  // Структурированные данные для страницы политики конфиденциальности
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('privacy.title'),
    "description": t('privacy.metaDescription'),
    "publisher": {
      "@type": "Organization",
      "name": "O.V. Automoción",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ovautomocion.es/images/logo.png"
      }
    },
    "inLanguage": currentLanguage
  };

  return (
    <PageTransition>
      <SEOHead
        title={`${t('privacy.title')} | O.V. Automoción`}
        description={t('privacy.metaDescription')}
        structuredData={structuredData}
        additionalMetaTags={[
          { name: 'keywords', content: t('privacy.metaKeywords') }
        ]}
      />
      
      <div className="w-full">
        <div className="bg-gradient-to-r from-premium-black to-premium-black/90 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold text-white mb-4"
            >
              {t('privacy.title')}
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-premium-silver"
            >
              {t('privacy.subtitle')}
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
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.company.title')}</h2>
                <p>{t('privacy.company.name')}: OV Automoción</p>
                <p>{t('privacy.company.address')}:<br />
                  Carrer Mas del L Abat, 145F<br />
                  Poligono Ind. Alba<br />
                  43480-Vilaseca<br />
                  TARRAGONA
                </p>
                <p>{t('privacy.company.email')}: ovautomocion@gmail.com</p>
                <p>{t('privacy.company.id')}: IX8855040V</p>
                <p>{t('privacy.company.vat')}: X8855040V</p>
                <p>{t('privacy.company.authority')}: España</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataCollection.title')}</h2>
                <p>{t('privacy.dataCollection.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.dataCollection.booking')}</li>
                  <li>{t('privacy.dataCollection.communication')}</li>
                  <li>{t('privacy.dataCollection.legal')}</li>
                  <li>{t('privacy.dataCollection.improvement')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataProtection.title')}</h2>
                <p>{t('privacy.dataProtection.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.dataProtection.encryption')}</li>
                  <li>{t('privacy.dataProtection.access')}</li>
                  <li>{t('privacy.dataProtection.monitoring')}</li>
                  <li>{t('privacy.dataProtection.training')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
                <p>{t('privacy.cookies.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.cookies.essential')}</li>
                  <li>{t('privacy.cookies.analytics')}</li>
                  <li>{t('privacy.cookies.preferences')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title')}</h2>
                <p>{t('privacy.rights.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.rights.access')}</li>
                  <li>{t('privacy.rights.correct')}</li>
                  <li>{t('privacy.rights.delete')}</li>
                  <li>{t('privacy.rights.transfer')}</li>
                  <li>{t('privacy.rights.object')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
                <p>{t('privacy.contact.description')}</p>
                <p className="mt-2">Email: ovautomocion@gmail.com</p>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default PrivacyPage 