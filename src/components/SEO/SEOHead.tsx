import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
  structuredData?: any;
  additionalMetaTags?: Array<{ name: string; content: string }>;
}

const DEFAULT_LOCALE = 'es';
const SITE_URL = 'https://www.ovautomocion.es';

/**
 * Компонент для управления SEO-метатегами страницы
 */
export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  image = '/images/og-image.jpg',
  noindex = false,
  structuredData,
  additionalMetaTags = [],
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language || DEFAULT_LOCALE;
  
  // Формируем локализованный путь
  const langPrefix = currentLanguage === DEFAULT_LOCALE ? '' : `/${currentLanguage}`;
  
  // Используем переданный canonicalPath или текущий путь
  const path = canonicalPath || location.pathname;
  const canonicalUrl = `${SITE_URL}${path}`;
  
  // Генерируем метаданные с учетом языка
  const pageTitle = title || t('defaultPageTitle');
  const pageDescription = description || t('defaultPageDescription');

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph Tags */}
      <meta property="og:site_name" content="OV Automoción" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={currentLanguage} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
      
      {/* Noindex directive if needed */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Additional meta tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}
      
      {/* Structured data for rich snippets */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead; 