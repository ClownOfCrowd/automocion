import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface HreflangTagsProps {
  // Дополнительный URL-путь, если отличается от текущего пути
  pathname?: string;
  // Укажите true, если это страница, которая должна быть доступна только на определенных языках
  availableLanguages?: string[];
}

/**
 * Компонент для добавления hreflang-тегов на страницу
 * Автоматически генерирует теги для всех поддерживаемых языков
 */
const HreflangTags: React.FC<HreflangTagsProps> = ({ 
  pathname,
  availableLanguages
}) => {
  const location = useLocation();
  
  // Базовый URL сайта
  const baseUrl = 'https://www.ovautomocion.es';
  
  // Поддерживаемые языки
  const supportedLanguages = ['es', 'en', 'ru', 'de', 'fr'];
  
  // Языки, доступные для данной страницы
  const languages = availableLanguages || supportedLanguages;
  
  // Текущий путь, без языкового префикса
  const currentPath = pathname || getCurrentPathWithoutLanguage(location.pathname);
  
  return (
    <Helmet>
      {/* Canonical URL для текущей страницы */}
      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />
      
      {/* URL по умолчанию (x-default) */}
      <link 
        rel="alternate" 
        href={`${baseUrl}${currentPath}`} 
        hreflang="x-default" 
      />
      
      {/* Hreflang-теги для всех поддерживаемых языков */}
      {languages.map(lang => {
        // Формируем URL с языковым префиксом, для испанского используем корневой URL
        const langPath = lang === 'es' 
          ? `${baseUrl}${currentPath}` 
          : `${baseUrl}/${lang}${currentPath}`;
          
        return (
          <link 
            key={lang} 
            rel="alternate" 
            href={langPath} 
            hreflang={lang} 
          />
        );
      })}
    </Helmet>
  );
};

/**
 * Удаляет языковой префикс из пути
 * Например: /en/catalog -> /catalog
 */
function getCurrentPathWithoutLanguage(pathname: string): string {
  const supportedLanguages = ['en', 'ru', 'de', 'fr'];
  
  // Проверяем, начинается ли путь с языкового префикса
  for (const lang of supportedLanguages) {
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.substring(lang.length + 1);
    }
    if (pathname === `/${lang}`) {
      return '/';
    }
  }
  
  return pathname;
}

export default HreflangTags; 