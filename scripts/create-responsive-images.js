import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Определяем __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к исходным и целевым директориям
const SOURCE_DIR = path.join(__dirname, '../public');
const TARGET_DIR = path.join(__dirname, '../public/responsive');

// Размеры для создания адаптивных изображений (ширина в пикселях)
const SIZES = [320, 640, 768, 1024, 1280, 1920];

// Создаем директории для адаптивных изображений
const createDirs = () => {
  const dirs = [
    'public/responsive', 
    'public/responsive/cars',
    'public/responsive/images'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Создана директория: ${dir}`);
    }
  });
};

// Функция для создания адаптивных изображений из PNG и JPG
const createResponsiveImages = async () => {
  try {
    // Проверка наличия sharp
    if (!fs.existsSync(path.join(__dirname, '../node_modules/sharp'))) {
      console.error('Ошибка: Sharp не установлен. Установите его с помощью: npm install sharp');
      return;
    }
    
    // Создаем адаптивные изображения из cars
    const carsDir = path.join(SOURCE_DIR, 'cars');
    if (fs.existsSync(carsDir)) {
      const carFiles = fs.readdirSync(carsDir).filter(file => 
        file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
      );
      
      for (const file of carFiles) {
        console.log(`Обработка: ${file}`);
        const inputPath = path.join(carsDir, file);
        const fileName = path.parse(file).name;
        
        // Создаем разные размеры
        for (const width of SIZES) {
          const outputPath = path.join(
            TARGET_DIR, 
            'cars', 
            `${fileName}-${width}.webp`
          );
          
          await sharp(inputPath)
            .resize({ width })
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          console.log(`  Создан файл: ${outputPath}`);
        }
      }
    }
    
    // Создаем адаптивные изображения из папки images
    const imagesDir = path.join(SOURCE_DIR, 'images');
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
      );
      
      for (const file of imageFiles) {
        console.log(`Обработка: ${file}`);
        const inputPath = path.join(imagesDir, file);
        const fileName = path.parse(file).name;
        
        // Создаем разные размеры
        for (const width of SIZES) {
          const outputPath = path.join(
            TARGET_DIR, 
            'images', 
            `${fileName}-${width}.webp`
          );
          
          await sharp(inputPath)
            .resize({ width })
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          console.log(`  Создан файл: ${outputPath}`);
        }
      }
    }
    
    // Обрабатываем изображения в корне /public
    const rootImages = fs.readdirSync(SOURCE_DIR).filter(file => 
      (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) &&
      !file.includes('-') // Исключаем уже обработанные изображения
    );
    
    for (const file of rootImages) {
      console.log(`Обработка: ${file}`);
      const inputPath = path.join(SOURCE_DIR, file);
      const fileName = path.parse(file).name;
      
      // Создаем разные размеры
      for (const width of SIZES) {
        const outputPath = path.join(
          TARGET_DIR, 
          `${fileName}-${width}.webp`
        );
        
        await sharp(inputPath)
          .resize({ width })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`  Создан файл: ${outputPath}`);
      }
    }
    
    console.log('Все адаптивные изображения успешно созданы!');
  } catch (error) {
    console.error('Ошибка при создании адаптивных изображений:', error);
  }
};

// Запускаем процесс создания адаптивных изображений
createDirs();
createResponsiveImages(); 