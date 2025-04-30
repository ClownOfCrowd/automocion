import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface HreflangTagsProps {
  supportedLanguages: string[];
  defaultLanguage: string;
  baseUrl: string;
}

/**
 * Компонент для добавления hreflang-тегов для всех поддерживаемых языков
 */
export const HreflangTags: React.FC<HreflangTagsProps> = ({
  supportedLanguages,
  defaultLanguage,
  baseUrl
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Определяем базовый путь без языкового префикса
  let pathWithoutLang = currentPath;
  
  // Проверяем, начинается ли текущий путь с языкового префикса
  for (const lang of supportedLanguages) {
    if (currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`) {
      pathWithoutLang = currentPath.substring(lang.length + 1) || '/';
      break;
    }
  }
  
  return (
    <Helmet>
      {/* Добавляем hreflang-теги для всех поддерживаемых языков */}
      {supportedLanguages.map(lang => {
        // Формируем URL для текущего языка
        const langPath = lang === defaultLanguage ? '' : `/${lang}`;
        const fullPath = pathWithoutLang === '/' ? langPath : `${langPath}${pathWithoutLang}`;
        
        return (
          <link 
            key={lang}
            rel="alternate" 
            hreflang={lang} 
            href={`${baseUrl}${fullPath}`} 
          />
        );
      })}
      
      {/* Добавляем x-default hreflang для поисковых систем */}
      <link 
        rel="alternate"
        hreflang="x-default"
        href={`${baseUrl}${defaultLanguage === 'es' ? '' : `/${defaultLanguage}`}${pathWithoutLang}`}
      />
    </Helmet>
  );
};

export default HreflangTags; 