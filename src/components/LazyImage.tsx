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
}

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  maxHeight,
  objectFit = 'cover',
  customAdjustments = true
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
          loading="lazy"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default LazyImage; 