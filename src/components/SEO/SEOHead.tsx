import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Компонент для управления SEO-метатегами страницы
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = 'https://www.ovautomocion.es/hero-bg.jpg',
  noindex = false
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;
  
  // Базовый URL сайта
  const baseUrl = 'https://www.ovautomocion.es';
  
  // Полный URL текущей страницы
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Значения по умолчанию
  const defaultTitle = t('seo.defaultTitle', 'O.V. Automoción - Alquiler de Coches Premium en Vila-seca');
  const defaultDescription = t('seo.defaultDescription', 'Servicio de alquiler de vehículos premium en Vila-seca, Tarragona. Reserva fácil, precios competitivos, amplia selección de SUVs, coches económicos y vehículos premium.');
  
  // Локализованные значения для текущего языка
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  
  return (
    <Helmet>
      {/* Базовые метатеги */}
      <html lang={currentLanguage} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Индексация */}
      {noindex && <meta name="robots" content="noindex, follow" />}
      
      {/* OpenGraph теги */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="O.V. Automoción" />
      
      {/* Twitter карточка */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}; 