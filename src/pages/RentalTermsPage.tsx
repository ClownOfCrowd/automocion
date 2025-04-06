import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

const RentalTermsPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'es';

  const sections = [
    {
      title: t('terms.requirements.title'),
      items: [
        t('terms.requirements.age'),
        t('terms.requirements.license'),
        t('terms.requirements.credit'),
        t('terms.requirements.documents')
      ],
      details: t('terms.requirements.details')
    },
    {
      title: t('terms.insurance.title'),
      items: [
        t('terms.insurance.basic'),
        t('terms.insurance.full'),
        t('terms.insurance.theft'),
        t('terms.insurance.assistance')
      ],
      details: t('terms.insurance.details')
    },
    {
      title: t('terms.payment.title'),
      items: [
        t('terms.payment.methods'),
        t('terms.payment.deposit'),
        t('terms.payment.cancellation'),
        t('terms.payment.refund')
      ],
      details: t('terms.payment.details')
    },
    {
      title: t('terms.additional.title'),
      items: [
        t('terms.additional.fuel'),
        t('terms.additional.mileage'),
        t('terms.additional.cleaning'),
        t('terms.additional.delivery')
      ],
      details: t('terms.additional.details')
    },
    {
      title: t('terms.coverage.title'),
      items: [
        t('terms.coverage.cdw'),
        t('terms.coverage.tpl'),
        t('terms.coverage.tp'),
        t('terms.coverage.pai')
      ],
      details: t('terms.coverage.details')
    },
    {
      title: t('terms.included.title'),
      items: [
        t('terms.included.contract'),
        t('terms.included.facilities'),
        t('terms.included.roadside'),
        t('terms.included.taxes')
      ],
      details: t('terms.included.details')
    },
    {
      title: t('terms.mileage.title'),
      items: [
        t('terms.mileage.limit1'),
        t('terms.mileage.limit2'),
        t('terms.mileage.limit3'),
        t('terms.mileage.additional')
      ],
      details: t('terms.mileage.details')
    },
    {
      title: t('terms.notIncluded.title'),
      items: [
        t('terms.notIncluded.cleaning'),
        t('terms.notIncluded.fines'),
        t('terms.notIncluded.fuel'),
        t('terms.notIncluded.extras')
      ],
      details: t('terms.notIncluded.details')
    },
    {
      title: t('terms.penalties.title'),
      items: [
        t('terms.penalties.smoking'),
        t('terms.penalties.pets'),
        t('terms.penalties.damages')
      ],
      details: t('terms.penalties.details')
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>{t('rental.termsTitle', 'Condiciones de Alquiler')} | O.V. Automoción</title>
        <meta name="description" content={t('rental.metaDescription', 'Términos y condiciones para el alquiler de vehículos en O.V. Automoción. Requisitos, coberturas, seguros, exclusiones y políticas de alquiler de nuestro servicio de coches en Vila-seca.')} />
        <meta name="keywords" content={t('rental.metaKeywords', 'condiciones alquiler, requisitos, seguros, coberturas, políticas, alquiler coches')} />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}rental-terms`} />
        <meta property="og:title" content={`${t('rental.termsTitle', 'Condiciones de Alquiler')} | O.V. Automoción`} />
        <meta property="og:description" content={t('rental.metaDescription', 'Términos y condiciones para el alquiler de vehículos en O.V. Automoción. Requisitos, coberturas, seguros, exclusiones y políticas de alquiler de nuestro servicio de coches en Vila-seca.')} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`https://www.ovautomocion.es/${currentLanguage !== 'es' ? currentLanguage + '/' : ''}rental-terms`} />
        <meta property="twitter:title" content={`${t('rental.termsTitle', 'Condiciones de Alquiler')} | O.V. Automoción`} />
        <meta property="twitter:description" content={t('rental.metaDescription', 'Términos y condiciones para el alquiler de vehículos en O.V. Automoción. Requisitos, coberturas, seguros, exclusiones y políticas de alquiler de nuestro servicio de coches en Vila-seca.')} />
        
        {/* Альтернативные языковые версии */}
        <link rel="alternate" hreflang="es" href="https://www.ovautomocion.es/rental-terms" />
        <link rel="alternate" hreflang="en" href="https://www.ovautomocion.es/en/rental-terms" />
        <link rel="alternate" hreflang="de" href="https://www.ovautomocion.es/de/rental-terms" />
        <link rel="alternate" hreflang="fr" href="https://www.ovautomocion.es/fr/rental-terms" />
        <link rel="alternate" hreflang="ru" href="https://www.ovautomocion.es/ru/rental-terms" />
        <link rel="alternate" hreflang="x-default" href="https://www.ovautomocion.es/rental-terms" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-premium-black to-premium-black/90">
        <div className="absolute inset-0">
          <img
            src="/terms-bg.jpg"
            alt="Luxury cars"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-premium-gold">{t('terms.title')}</span>
            </h1>
            <p className="text-xl text-premium-silver">
              {t('terms.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <div className="bg-white dark:bg-premium-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-premium-black/50 p-8 rounded-lg shadow-lg border border-premium-gold/10"
              >
                <h2 className="text-2xl font-bold mb-6 text-premium-gold">
                  {section.title}
                </h2>
                <ul className="space-y-4 mb-6">
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <svg
                        className="h-6 w-6 text-premium-gold flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-premium-silver">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                {section.details && (
                  <div className="mt-4 p-4 bg-premium-gold/5 rounded-lg border border-premium-gold/10">
                    <p className="text-sm text-gray-600 dark:text-premium-silver/80">
                      {section.details}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-premium-silver max-w-2xl mx-auto">
              {t('terms.footer')}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RentalTermsPage; 