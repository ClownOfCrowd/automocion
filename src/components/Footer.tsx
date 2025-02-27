import { useTranslation } from 'react-i18next'
import PaymentBadges from './PaymentBadges'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Automoción
            </h3>
            <p className="mt-4 text-base text-gray-300 dark:text-gray-400 transition-colors duration-300">
              {t('footer.company.about')}
              <br />
              {t('footer.company.description')}
            </p>
            {/* Платежные методы */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                {t('footer.payments')}
              </h4>
              <PaymentBadges variant="compact" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t('footer.contact.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="tel:+34600000000" className="text-base text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-300">
                  +34 600 000 000
                </a>
              </li>
              <li>
                <a href="mailto:info@automocion.es" className="text-base text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-300">
                  info@automocion.es
                </a>
              </li>
              <li>
                <span className="text-base text-gray-300 dark:text-gray-400 transition-colors duration-300">
                  {t('contact.info.address')}
                  <br />
                  {t('contact.info.location')}
                  <br />
                  {t('contact.info.postal')}
                </span>
              </li>
              <li>
                <span className="text-base text-gray-300 dark:text-gray-400 transition-colors duration-300">
                  {t('contact.info.schedule')}
                  <br />
                  {t('contact.info.workdays')}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t('footer.social.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-300">
                  {t('contact.social.instagram')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-300">
                  {t('contact.social.facebook')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-300">
                  {t('contact.social.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 dark:border-gray-800 pt-8 transition-colors duration-300">
          <p className="text-base text-gray-400 dark:text-gray-500 xl:text-center transition-colors duration-300">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 