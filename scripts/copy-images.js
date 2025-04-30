import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname эквивалент для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пути к директориям
const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(__dirname, '../public/optimized');
const CARS_DIR = path.join(PUBLIC_DIR, 'cars');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const OPTIMIZED_CARS_DIR = path.join(OPTIMIZED_DIR, 'cars');
const OPTIMIZED_IMAGES_DIR = path.join(OPTIMIZED_DIR, 'images');

// Создаем директории, если они не существуют
const createDirectories = () => {
  const dirs = [OPTIMIZED_DIR, OPTIMIZED_CARS_DIR, OPTIMIZED_IMAGES_DIR];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Создана директория: ${dir}`);
    }
  });
};

// Копируем файлы из исходной директории в целевую
const copyFiles = (sourceDir, targetDir) => {
  if (!fs.existsSync(sourceDir)) {
    console.log(`Директория ${sourceDir} не существует, пропускаем...`);
    return;
  }
  
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    // Проверяем, не директория ли это
    if (fs.statSync(sourcePath).isDirectory()) {
      // Если это директория, создаем ее в целевой папке и рекурсивно копируем содержимое
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      copyFiles(sourcePath, targetPath);
    } else {
      // Копируем файл
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Скопирован файл: ${file}`);
    }
  });
};

// Копируем изображения из корневой директории public
const copyRootImages = () => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  const files = fs.readdirSync(PUBLIC_DIR);
  
  files.forEach(file => {
    const sourcePath = path.join(PUBLIC_DIR, file);
    const targetPath = path.join(OPTIMIZED_DIR, file);
    
    // Проверяем, не директория ли это и имеет ли файл расширение изображения
    if (!fs.statSync(sourcePath).isDirectory() && 
        imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
      // Копируем файл
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Скопирован файл: ${file}`);
    }
  });
};

// Выполняем копирование
console.log('Начинаем копирование файлов...');
createDirectories();
copyFiles(CARS_DIR, OPTIMIZED_CARS_DIR);
copyFiles(IMAGES_DIR, OPTIMIZED_IMAGES_DIR);
copyRootImages();
console.log('Копирование завершено!'); 