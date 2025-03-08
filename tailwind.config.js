/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        premium: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
          black: '#1A1A1A',
          'black-deep': '#0F0F0F',
          'black-rich': '#121212',
          'black-elegant': '#1E1E1E',
          'black-charcoal': '#2C2C2C',
          'black-onyx': '#353535',
        },
      },
      backgroundImage: {
        'premium-gradient-1': 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)',
        'premium-gradient-2': 'linear-gradient(135deg, #0F0F0F 0%, #1E1E1E 100%)',
        'premium-gradient-3': 'linear-gradient(to right, #1A1A1A 0%, #353535 100%)',
        'premium-gradient-4': 'linear-gradient(to bottom, #121212 0%, #2C2C2C 100%)',
        'premium-gradient-gold': 'linear-gradient(135deg, #1A1A1A 0%, #1E1E1E 70%, #D4AF37 200%)',
        'premium-radial': 'radial-gradient(circle, #2C2C2C 0%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 