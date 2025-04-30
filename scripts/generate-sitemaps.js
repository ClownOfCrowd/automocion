import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию в ES модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Базовый URL сайта
const BASE_URL = 'https://www.ovautomocion.es';

// Поддерживаемые языки
const LANGUAGES = ['es', 'en', 'ru', 'de', 'fr'];

// Текущая дата в формате ISO для lastmod
const currentDate = new Date().toISOString().split('T')[0] + 'T10:00:00+00:00';

// Общие страницы, доступные на всех языках
const COMMON_PAGES = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'catalog', changefreq: 'weekly', priority: '0.9' },
  { path: 'blog', changefreq: 'weekly', priority: '0.8' },
  { path: 'news', changefreq: 'weekly', priority: '0.8' },
  { path: 'contact', changefreq: 'monthly', priority: '0.7' },
  { path: 'terms', changefreq: 'monthly', priority: '0.6' },
  { path: 'privacy', changefreq: 'monthly', priority: '0.6' }
];

/**
 * Генерирует XML-файл карты сайта для конкретного языка
 */
function generateSitemapForLanguage(language) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Добавляем URL для каждой страницы на этом языке
  for (const page of COMMON_PAGES) {
    const langPath = language === 'es' ? '' : `/${language}`;
    const pagePath = page.path ? `/${page.path}` : '';
    const fullPath = `${langPath}${pagePath}`;
    
    sitemap += `
    <url>
        <loc>${BASE_URL}${fullPath}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>`;
    
    // Добавляем hreflang-ссылки для всех поддерживаемых языков
    for (const lang of LANGUAGES) {
      const langPrefix = lang === 'es' ? '' : `/${lang}`;
      sitemap += `
        <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${langPrefix}${pagePath}"/>`;
    }
    
    // Добавляем x-default ссылку (на испанский)
    sitemap += `
        <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${pagePath}"/>
    </url>`;
  }
  
  sitemap += `
</urlset>`;

  // Записываем файл
  const outputPath = path.resolve(__dirname, `../public/sitemap_${language}.xml`);
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Generated sitemap for ${language} language at ${outputPath}`);
}

/**
 * Генерирует индексный файл карты сайта
 */
function generateSitemapIndex() {
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Добавляем ссылки на языковые карты сайта
  for (const language of LANGUAGES) {
    sitemapIndex += `
   <sitemap>
      <loc>${BASE_URL}/sitemap_${language}.xml</loc>
      <lastmod>${currentDate}</lastmod>
   </sitemap>`;
  }
  
  sitemapIndex += `
</sitemapindex>`;

  // Записываем файл
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapIndex);
  console.log(`Generated sitemap index at ${outputPath}`);
}

// Генерируем карты сайта для всех языков
for (const language of LANGUAGES) {
  generateSitemapForLanguage(language);
}

// Генерируем индексный файл
generateSitemapIndex();

console.log('All sitemaps generated successfully!'); 