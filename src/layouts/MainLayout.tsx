import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BookingNotifications from '../components/BookingNotifications'
import CookieConsent from '../components/CookieConsent'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEO/SEOHead'
import HreflangTags from '../components/SEO/HreflangTags'

// Конфигурация для SEO
const SITE_URL = 'https://www.ovautomocion.es';
const DEFAULT_LANGUAGE = 'es';
const SUPPORTED_LANGUAGES = ['es', 'en', 'ru', 'de', 'fr'];

const MainLayout = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Определяем SEO данные в зависимости от текущего пути
  const getSeoData = () => {
    const pathname = location.pathname;
    
    // На основе пути определяем текущую страницу
    if (pathname.endsWith('/catalog') || pathname.match(/\/[a-z]{2}\/catalog$/)) {
      return {
        title: t('seo.catalogPage.title', 'Our Fleet - Premium Car Rental | O.V. Automoción'),
        description: t('seo.catalogPage.description', 'Explore our extensive fleet of premium and economy vehicles available for rent. Range Rover, Mercedes, Mini Cooper and many more options.')
      };
    }
    
    if (pathname.endsWith('/contact') || pathname.match(/\/[a-z]{2}\/contact$/)) {
      return {
        title: t('seo.contactPage.title', 'Contact Us - O.V. Automoción | Car Rental in Vila-seca'),
        description: t('seo.contactPage.description', 'Contact O.V. Automoción for premium car rental in Vila-seca, Tarragona. Get in touch for quotes, special requests or more information.')
      };
    }
    
    if (pathname.endsWith('/blog') || pathname.match(/\/[a-z]{2}\/blog$/)) {
      return {
        title: t('seo.blogPage.title', 'Blog - Car Rental Tips & News | O.V. Automoción'),
        description: t('seo.blogPage.description', 'Read our blog for tips on car rental, driving in Spain, vehicle maintenance and the latest news from O.V. Automoción.')
      };
    }
    
    if (pathname.endsWith('/terms') || pathname.match(/\/[a-z]{2}\/terms$/)) {
      return {
        title: t('seo.termsPage.title', 'Rental Terms & Conditions | O.V. Automoción'),
        description: t('seo.termsPage.description', 'Read our rental terms and conditions for all details regarding car rental with O.V. Automoción in Vila-seca, Tarragona.')
      };
    }
    
    if (pathname.endsWith('/privacy') || pathname.match(/\/[a-z]{2}\/privacy$/)) {
      return {
        title: t('seo.privacyPage.title', 'Privacy Policy | O.V. Automoción'),
        description: t('seo.privacyPage.description', 'Learn about how O.V. Automoción handles your personal data and privacy when using our car rental services.')
      };
    }
    
    // Главная страница или другие страницы по умолчанию
    return {
      title: t('seo.homePage.title', 'O.V. Automoción - Premium Car Rental in Vila-seca, Tarragona'),
      description: t('seo.homePage.description', 'Luxury and premium car rental in Vila-seca, Tarragona. Wide selection of high-end and economy vehicles with personalized service.')
    };
  };
  
  const { title, description } = getSeoData();
  
  // Структурированные данные для LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "O.V. Automoción",
    "image": `${SITE_URL}/images/logo.png`,
    "url": SITE_URL,
    "telephone": "+34 000 000 000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Ejemplo, 123",
      "addressLocality": "Vila-seca",
      "postalCode": "43480",
      "addressRegion": "Tarragona",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.1111,
      "longitude": 1.1111
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "€€"
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-premium-black text-premium-black dark:text-white transition-colors duration-300">
      <SEOHead 
        title={title}
        description={description}
        structuredData={structuredData}
      />
      
      <HreflangTags 
        supportedLanguages={SUPPORTED_LANGUAGES}
        defaultLanguage={DEFAULT_LANGUAGE}
        baseUrl={SITE_URL}
      />

      <Navbar />
      <main className="flex-grow w-full pt-16">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BookingNotifications />
      <CookieConsent />
    </div>
  )
}

export default MainLayout 