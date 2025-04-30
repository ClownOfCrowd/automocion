import { useTranslation } from 'react-i18next'
import PaymentBadges from './PaymentBadges'

const Footer = () => {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()

  // Создаем функцию для генерации URL WhatsApp с текстом из переводов
  const getWhatsAppLink = () => {
    const phone = "34603592358"
    const message = t('cyberground.message')
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <footer className="relative bg-gradient-to-r from-premium-black-deep to-premium-black">
      <div className="absolute inset-0">
        <div className="bg-premium-black/50 w-full h-full"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              <span className="text-premium-steel-light">O.V.</span> <span className="text-premium-red">Automoción</span>
            </h3>
            <p className="mt-4 text-base text-premium-steel">
              {t('footer.company.about')}
              <br />
              {t('footer.company.description')}
            </p>
            {/* Платежные методы */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">
                <span className="text-premium-red">{t('footer.payments')}</span>
              </h4>
              <PaymentBadges variant="compact" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              <span className="text-premium-red">{t('footer.contact.title')}</span>
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="tel:+34671332591" className="text-base text-premium-steel hover:text-premium-red transition-colors duration-300">
                  +34 671 332 591 (esp/eng)
                </a>
              </li>
              <li>
                <a href="tel:+34647030703" className="text-base text-premium-steel hover:text-premium-red transition-colors duration-300">
                  +34 647 030 703 (rus/ua)
                </a>
              </li>
              <li>
                <a href="mailto:ovautomocion@gmail.com" className="text-base text-premium-steel hover:text-premium-red transition-colors duration-300">
                  ovautomocion@gmail.com
                </a>
              </li>
              <li>
                <span className="text-base text-premium-steel-light">
                  {t('contact.info.address')}
                  <br />
                  {t('contact.info.location')}
                  <br />
                  {t('contact.info.postal')}
                </span>
              </li>
              <li>
                <span className="text-base text-premium-steel-light">
                  {t('contact.info.schedule')}
                  <br />
                  {t('contact.info.workdays')}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              <span className="text-premium-red">{t('footer.social.title')}</span>
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://www.instagram.com/o.v.auto_mocion/" target="_blank" rel="noopener noreferrer" className="text-base text-premium-steel hover:text-premium-red transition-colors duration-300">
                  {t('contact.social.instagram')}
                </a>
              </li>
              <li>
                <a href="https://wa.me/34647030703" target="_blank" rel="noopener noreferrer" className="text-base text-premium-steel hover:text-premium-red transition-colors duration-300">
                  {t('contact.social.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-premium-red/10 pt-8">
          <p className="text-base text-premium-steel xl:text-center">
            © {currentYear} <span className="text-premium-steel-light">O.V.</span> <span className="text-premium-red">Automoción</span>. {t('footer.copyright')}
            <span className="mx-2">|</span>
            <a href="/privacy" className="text-premium-steel hover:text-premium-red transition-colors duration-300">
              {t('cookies.privacy')}
            </a>
            <span className="mx-2">|</span>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-premium-red hover:text-premium-red-light transition-colors duration-300"
            >
              Powered by Cyberground
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 