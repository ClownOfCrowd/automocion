import { useTranslation } from 'react-i18next'
import PaymentBadges from './PaymentBadges'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-r from-premium-black to-premium-black/90">
      <div className="absolute inset-0">
        <div className="bg-premium-black/50 w-full h-full"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-premium-gold tracking-wider uppercase">
              O.V. Automoción
            </h3>
            <p className="mt-4 text-base text-premium-silver">
              {t('footer.company.about')}
              <br />
              {t('footer.company.description')}
            </p>
            {/* Платежные методы */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-premium-gold tracking-wider uppercase mb-4">
                {t('footer.payments')}
              </h4>
              <PaymentBadges variant="compact" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-premium-gold tracking-wider uppercase">
              {t('footer.contact.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="tel:+34600000000" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  +34 600 000 000
                </a>
              </li>
              <li>
                <a href="mailto:info@automocion.es" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  info@automocion.es
                </a>
              </li>
              <li>
                <span className="text-base text-premium-silver">
                  {t('contact.info.address')}
                  <br />
                  {t('contact.info.location')}
                  <br />
                  {t('contact.info.postal')}
                </span>
              </li>
              <li>
                <span className="text-base text-premium-silver">
                  {t('contact.info.schedule')}
                  <br />
                  {t('contact.info.workdays')}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-premium-gold tracking-wider uppercase">
              {t('footer.social.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  {t('contact.social.instagram')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  {t('contact.social.facebook')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  {t('contact.social.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-premium-gold/10 pt-8">
          <p className="text-base text-premium-silver xl:text-center">
            © {currentYear} O.V. Automoción. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 