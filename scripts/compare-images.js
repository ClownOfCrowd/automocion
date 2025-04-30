import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для сравнения размеров PNG и WebP файлов
const compareSizes = () => {
  console.log('Сравнение размеров PNG и WebP файлов:');
  console.log('Файл              | PNG (KB)  | WebP (KB) | Сжатие (%)');
  console.log('------------------|-----------|-----------|----------');
  
  const carsDir = path.join(__dirname, '../public/cars');
  const webpDir = path.join(__dirname, '../public/optimized/cars');
  
  // Определяем pngFiles здесь, чтобы был доступ во всей функции
  let pngFiles = [];
  
  if (fs.existsSync(carsDir) && fs.existsSync(webpDir)) {
    pngFiles = fs.readdirSync(carsDir).filter(file => file.endsWith('.png'));
    
    pngFiles.forEach(file => {
      const pngPath = path.join(carsDir, file);
      const webpPath = path.join(webpDir, file.replace('.png', '.webp'));
      
      if (fs.existsSync(pngPath) && fs.existsSync(webpPath)) {
        const pngSize = fs.statSync(pngPath).size / 1024; // в KB
        const webpSize = fs.statSync(webpPath).size / 1024; // в KB
        const compression = 100 - (webpSize / pngSize * 100);
        
        console.log(
          `${file.padEnd(18)} | ${pngSize.toFixed(2).padEnd(9)} | ${webpSize.toFixed(2).padEnd(9)} | ${compression.toFixed(2)}%`
        );
      }
    });
  }
  
  // Теперь проверим суммарные размеры
  const totalPngSize = pngFiles.reduce((total, file) => {
    const pngPath = path.join(carsDir, file);
    return total + fs.statSync(pngPath).size / 1024;
  }, 0);
  
  const totalWebpSize = pngFiles.reduce((total, file) => {
    const webpPath = path.join(webpDir, file.replace('.png', '.webp'));
    if (fs.existsSync(webpPath)) {
      return total + fs.statSync(webpPath).size / 1024;
    }
    return total;
  }, 0);
  
  const totalCompression = 100 - (totalWebpSize / totalPngSize * 100);
  
  console.log('------------------|-----------|-----------|----------');
  console.log(
    `${'ИТОГО:'.padEnd(18)} | ${totalPngSize.toFixed(2).padEnd(9)} | ${totalWebpSize.toFixed(2).padEnd(9)} | ${totalCompression.toFixed(2)}%`
  );
};

// Запускаем анализ
compareSizes(); 