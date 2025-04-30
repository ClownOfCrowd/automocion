import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем директории для оптимизированных изображений
const createDirs = () => {
  const dirs = ['public/optimized', 'public/optimized/cars', 'public/optimized/images'];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Создана директория: ${dir}`);
    }
  });
};

// Конвертируем изображения в WebP
const convertToWebP = () => {
  try {
    // Проверяем, установлен ли cwebp
    try {
      execSync('cwebp -version', { stdio: 'ignore' });
    } catch (error) {
      console.error('ОШИБКА: cwebp не установлен. Установите его для конвертации в WebP.');
      console.error('Windows: https://developers.google.com/speed/webp/docs/precompiled');
      console.error('npm: npm install -g webp-converter');
      return;
    }

    // Конвертируем PNG из cars
    const carsDir = path.join(__dirname, '../public/cars');
    if (fs.existsSync(carsDir)) {
      const carFiles = fs.readdirSync(carsDir).filter(file => file.endsWith('.png'));
      
      carFiles.forEach(file => {
        const inputPath = path.join(carsDir, file);
        const outputPath = path.join(__dirname, '../public/optimized/cars', file.replace('.png', '.webp'));
        
        console.log(`Конвертирую: ${file}`);
        execSync(`cwebp -q 85 "${inputPath}" -o "${outputPath}"`);
      });
      
      console.log(`Сконвертировано ${carFiles.length} изображений автомобилей в WebP`);
    }

    // Конвертируем JPG из корневого каталога public
    const publicDir = path.join(__dirname, '../public');
    if (fs.existsSync(publicDir)) {
      const rootImages = fs.readdirSync(publicDir).filter(file => 
        file.endsWith('.jpg') || file.endsWith('.jpeg')
      );
      
      rootImages.forEach(file => {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(__dirname, '../public/optimized', file.replace(/\.(jpg|jpeg)$/, '.webp'));
        
        console.log(`Конвертирую: ${file}`);
        execSync(`cwebp -q 85 "${inputPath}" -o "${outputPath}"`);
      });
      
      console.log(`Сконвертировано ${rootImages.length} изображений из корневого каталога в WebP`);
    }

    // Конвертируем JPG из images
    const imagesDir = path.join(__dirname, '../public/images');
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith('.jpg') || file.endsWith('.jpeg')
      );
      
      imageFiles.forEach(file => {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(__dirname, '../public/optimized/images', file.replace(/\.(jpg|jpeg)$/, '.webp'));
        
        console.log(`Конвертирую: ${file}`);
        execSync(`cwebp -q 85 "${inputPath}" -o "${outputPath}"`);
      });
      
      console.log(`Сконвертировано ${imageFiles.length} изображений из папки images в WebP`);
    }

    console.log('Все изображения успешно сконвертированы в WebP формат!');
  } catch (error) {
    console.error('Произошла ошибка при конвертации изображений:', error);
  }
};

// Запускаем процесс оптимизации
createDirs();
convertToWebP(); 