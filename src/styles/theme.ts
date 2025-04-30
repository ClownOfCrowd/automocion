export const theme = {
  colors: {
    // Основные цвета
    black: '#0B0B0B',
    red: '#C41E3A',
    steel: '#71797E',
    
    // Вариации черного
    blackDeep: '#000000',
    blackRich: '#121212',
    blackElegant: '#1E1E1E',
    blackCharcoal: '#2C2C2C',
    blackOnyx: '#353535',
    
    // Вариации красного
    redDark: '#8B0000',
    redLight: '#FF3A4C',
    
    // Вариации стального
    steelLight: '#AEB6BF',
    steelDark: '#4A4E4F',
    steelMetallic: '#43464B',
    
    // Функциональные цвета
    success: '#19be6b',
    warning: '#ffb700',
    error: '#fa3e3e',
    info: '#2d8cf0',
  },
  
  // Градиенты
  gradients: {
    premiumGradient1: 'linear-gradient(135deg, #0B0B0B 0%, #2C2C2C 100%)',
    premiumGradient2: 'linear-gradient(135deg, #000000 0%, #1E1E1E 100%)',
    premiumGradient3: 'linear-gradient(to right, #121212 0%, #353535 100%)',
    premiumGradient4: 'linear-gradient(to bottom, #0B0B0B 0%, #2C2C2C 100%)',
    premiumGradientRed: 'linear-gradient(135deg, #0B0B0B 0%, #1E1E1E 70%, #C41E3A 200%)',
    premiumRadial: 'radial-gradient(circle, #2C2C2C 0%, #0B0B0B 100%)',
    steelGradient1: 'linear-gradient(135deg, #AEB6BF 0%, #71797E 100%)',
    steelGradient2: 'linear-gradient(135deg, #C0C0C0 0%, #4A4E4F 100%)',
    steelGradient3: 'linear-gradient(to right, #AEB6BF 0%, #43464B 100%)',
    steelGradient4: 'linear-gradient(to bottom, #C0C0C0 0%, #71797E 100%)',
    steelGradientRed: 'linear-gradient(135deg, #71797E 0%, #4A4E4F 70%, #C41E3A 200%)',
    redGradient1: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)',
    redBlackGradient: 'linear-gradient(to right, #0B0B0B 0%, #C41E3A 100%)',
    steelRadial: 'radial-gradient(circle, #71797E 0%, #43464B 100%)',
  },
  
  // Размеры шрифтов
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  // Толщина шрифта
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Тени
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Анимации
  animations: {
    smooth: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  
  // Радиусы скругления
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Основные размеры
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  }
};

export default theme; 