import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const RentalTermsPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t('terms.requirements.title'),
      items: [
        t('terms.requirements.age'),
        t('terms.requirements.license'),
        t('terms.requirements.credit'),
        t('terms.requirements.documents')
      ]
    },
    {
      title: t('terms.insurance.title'),
      items: [
        t('terms.insurance.basic'),
        t('terms.insurance.full'),
        t('terms.insurance.theft'),
        t('terms.insurance.assistance')
      ]
    },
    {
      title: t('terms.payment.title'),
      items: [
        t('terms.payment.methods'),
        t('terms.payment.deposit'),
        t('terms.payment.cancellation'),
        t('terms.payment.refund')
      ]
    },
    {
      title: t('terms.additional.title'),
      items: [
        t('terms.additional.fuel'),
        t('terms.additional.mileage'),
        t('terms.additional.cleaning'),
        t('terms.additional.delivery')
      ]
    }
  ];

  return (
    <PageTransition>
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
                <ul className="space-y-4">
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