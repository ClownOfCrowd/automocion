import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Удаляем циклический импорт
// import { SEOHead as SEOHeadComponent, HreflangTags } from './SEO';

// Удаляем реэкспорты, так как они создают циклическую зависимость
// export const SEOHead = SEOHeadComponent;
// export { HreflangTags };

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalUrl?: string;
  schemaData?: object;
  children?: React.ReactNode;
}

const SEO = ({
  title,
  description,
  keywords,
  image = '/hero-bg.jpg',
  noindex = false,
  nofollow = false,
  canonicalUrl,
  schemaData,
  children
}: SEOProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'es';
  
  // Формируем URL текущей страницы
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const baseUrl = 'https://www.ovautomocion.es';
  
  // Определяем канонический URL
  const canonical = canonicalUrl || `${baseUrl}${currentPath}`;
  
  // Формируем тег robots
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  else robotsContent.push('index');
  if (nofollow) robotsContent.push('nofollow');
  else robotsContent.push('follow');
  
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent.join(', ')} />
      
      {/* Канонический URL */}
      <link rel="canonical" href={canonical} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${baseUrl}${image}`} />
      <meta property="og:locale" content={
        currentLanguage === 'es' ? 'es_ES' :
        currentLanguage === 'en' ? 'en_GB' :
        currentLanguage === 'fr' ? 'fr_FR' :
        currentLanguage === 'de' ? 'de_DE' :
        currentLanguage === 'ru' ? 'ru_RU' : 'es_ES'
      } />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image.startsWith('http') ? image : `${baseUrl}${image}`} />
      
      {/* Альтернативные языковые версии */}
      <link rel="alternate" hreflang="es" href={`${baseUrl}${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/en${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      <link rel="alternate" hreflang="fr" href={`${baseUrl}/fr${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      <link rel="alternate" hreflang="de" href={`${baseUrl}/de${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      <link rel="alternate" hreflang="ru" href={`${baseUrl}/ru${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${currentPath.replace(/^\/(en|fr|de|ru)/, '')}`} />
      
      {/* Структурированные данные JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
      
      {/* Дополнительные теги */}
      {children}
    </Helmet>
  );
};

export default SEO; 