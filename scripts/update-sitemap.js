import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise, Builder } from 'xml2js';

// Получаем текущую директорию для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Основные настройки
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const BASE_URL = 'https://www.ovautomocion.es';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // Текущая дата в формате YYYY-MM-DD

/**
 * Функция для обновления sitemap.xml
 */
async function updateSitemap() {
  try {
    // Чтение существующего файла sitemap.xml
    console.log('Чтение файла sitemap.xml...');
    const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Парсинг XML в JavaScript объект
    const sitemap = await parseStringPromise(sitemapXml);
    
    // Обновляем основные страницы с текущей датой
    const primaryPages = ['/'] // list of primary page paths
    
    // Обновление lastmod для существующих URL-адресов
    sitemap.urlset.url.forEach(url => {
      const urlPath = url.loc[0].replace(BASE_URL, '');
      
      // Обновляем даты изменений для основных страниц
      if (primaryPages.includes(urlPath)) {
        url.lastmod[0] = CURRENT_DATE;
      }
    });
    
    // Конвертация обратно в XML
    const builder = new Builder();
    const updatedXml = builder.buildObject(sitemap);
    
    // Запись обновленного XML в файл
    fs.writeFileSync(SITEMAP_PATH, updatedXml);
    
    console.log('Карта сайта успешно обновлена!');
    console.log(`Дата последнего обновления: ${CURRENT_DATE}`);
  } catch (error) {
    console.error('Ошибка при обновлении карты сайта:', error);
  }
}

/**
 * Функция для добавления новой страницы в sitemap.xml
 * @param {string} url - URL-адрес новой страницы относительно корня сайта (например, '/blog/new-post')
 * @param {string} priority - Приоритет страницы (от 0.0 до 1.0)
 * @param {string} changefreq - Частота изменения (например, 'monthly', 'weekly')
 * @param {string} imageUrl - URL изображения для страницы (опционально)
 * @param {string} imageTitle - Заголовок изображения (опционально)
 */
async function addPageToSitemap(url, priority = '0.7', changefreq = 'monthly', imageUrl = null, imageTitle = null) {
  try {
    // Чтение существующего файла sitemap.xml
    const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Парсинг XML в JavaScript объект
    const sitemap = await parseStringPromise(sitemapXml);
    
    // Проверка, существует ли уже такой URL
    const fullUrl = `${BASE_URL}${url}`;
    const existingUrlIndex = sitemap.urlset.url.findIndex(item => item.loc[0] === fullUrl);
    
    if (existingUrlIndex !== -1) {
      console.log(`URL ${fullUrl} уже существует в карте сайта. Обновление информации...`);
      sitemap.urlset.url[existingUrlIndex].lastmod[0] = CURRENT_DATE;
      sitemap.urlset.url[existingUrlIndex].priority[0] = priority;
      sitemap.urlset.url[existingUrlIndex].changefreq[0] = changefreq;
    } else {
      console.log(`Добавление нового URL: ${fullUrl}`);
      
      // Создание нового URL-элемента
      const newUrl = {
        loc: [fullUrl],
        lastmod: [CURRENT_DATE],
        changefreq: [changefreq],
        priority: [priority]
      };
      
      // Добавление изображения, если оно предоставлено
      if (imageUrl) {
        newUrl['image:image'] = [{
          'image:loc': [`${BASE_URL}${imageUrl}`],
          'image:title': [imageTitle || 'Image']
        }];
      }
      
      // Добавление нового URL в sitemap
      sitemap.urlset.url.push(newUrl);
    }
    
    // Конвертация обратно в XML
    const builder = new Builder();
    const updatedXml = builder.buildObject(sitemap);
    
    // Запись обновленного XML в файл
    fs.writeFileSync(SITEMAP_PATH, updatedXml);
    
    console.log('Страница успешно добавлена в карту сайта!');
  } catch (error) {
    console.error('Ошибка при добавлении страницы в карту сайта:', error);
  }
}

// Вызываем функцию обновления по умолчанию
updateSitemap();

// Экспортируем функции для использования в других скриптах
export {
  updateSitemap,
  addPageToSitemap
}; 