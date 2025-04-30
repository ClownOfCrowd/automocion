import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  maxHeight?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  customAdjustments?: boolean;
  priority?: boolean; // Приоритетная загрузка (без ленивой загрузки)
}

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  maxHeight,
  objectFit = 'cover',
  customAdjustments = true,
  priority = false
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Если priority=true, сразу устанавливаем isInView=true
  const imgRef = useRef<HTMLDivElement>(null);

  // Получаем путь к оптимизированному изображению
  const getOptimizedImagePath = () => {
    // Проверяем, есть ли расширение в исходном пути
    const hasExtension = /\.(png|jpg|jpeg|webp)$/i.test(src);
    
    if (src.includes('/cars/')) {
      // Если путь содержит /cars/, заменяем на /optimized/cars/
      return hasExtension 
        ? src.replace('/cars/', '/optimized/cars/') 
        : src;
    } else if (src.includes('/images/')) {
      // Если путь содержит /images/, заменяем на /optimized/images/
      return hasExtension 
        ? src.replace('/images/', '/optimized/images/') 
        : src;
    } else if (src.startsWith('/')) {
      // Для корневых изображений
      const fileName = src.split('/').pop();
      return hasExtension && fileName 
        ? `/optimized/${fileName}` 
        : src;
    }
    
    // Если ничего не подошло, возвращаем исходный путь
    return src;
  };

  const optimizedSrc = getOptimizedImagePath();

  useEffect(() => {
    // Если изображение должно загружаться приоритетно, не используем IntersectionObserver
    if (priority) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Предзагрузка изображений на расстоянии 100px от видимой области
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Определяем специальные корректировки на основе имени файла, если включены
  const getCustomStyles = () => {
    if (!customAdjustments) return {};
    
    // Извлекаем имя файла из пути
    const fileName = src.split('/').pop()?.toLowerCase() || '';
    
    // Проверяем, является ли это изображением автомобиля
    if (fileName.includes('.png') && src.includes('/cars/')) {
      // Стандартизированные коэффициенты масштабирования для каждого автомобиля
      const scaleFactors: Record<string, number> = {
        'citroen-c3': 1.25,
        'peugeot-207sw': 1.5,
        'peugeot-208': 1.15,
        'mini-cooper-s': 1.1,
        'mercedes-gle': 1.0,
        'range-rover-velar': 1.05,
        'seat-ibiza': 1.05
      };
      
      // Определяем, какой автомобиль это
      for (const carName in scaleFactors) {
        if (fileName.includes(carName)) {
          return { 
            transform: `scale(${scaleFactors[carName]})`, 
            transformOrigin: 'center center',
            padding: '8px' // Добавляем немного отступа для лучшего вида
          };
        }
      }
    }
    
    return {};
  };

  const imageStyle = {
    objectFit,
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
    ...getCustomStyles()
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : '100%',
        maxHeight: maxHeight ? `${maxHeight}px` : undefined
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={imageStyle}
          onLoad={handleImageLoad}
          loading={priority ? 'eager' : 'lazy'}
          width={width}
          height={height}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </div>
  );
};

export default LazyImage; 