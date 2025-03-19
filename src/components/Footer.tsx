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
              <div className="flex space-x-4">
                <img src="/images/payment/visa.svg" alt="Visa" className="h-8 w-auto" />
                <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-8 w-auto" />
                <img src="/images/payment/apple-pay.svg" alt="Apple Pay" className="h-8 w-auto" />
                <img src="/images/payment/google-pay.svg" alt="Google Pay" className="h-8 w-auto" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-premium-gold tracking-wider uppercase">
              {t('footer.contact.title')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="tel:+34671332591" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  +34 671 332 591 (esp/eng)
                </a>
              </li>
              <li>
                <a href="tel:+34647030703" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  +34 647 030 703 (rus/ua)
                </a>
              </li>
              <li>
                <a href="mailto:ovautomocion@gmail.com" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  ovautomocion@gmail.com
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
                <a href="https://www.instagram.com/o.v.auto_mocion/" target="_blank" rel="noopener noreferrer" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
                  {t('contact.social.instagram')}
                </a>
              </li>
              <li>
                <a href="https://wa.me/34671332591" target="_blank" rel="noopener noreferrer" className="text-base text-premium-silver hover:text-premium-gold transition-colors duration-300">
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