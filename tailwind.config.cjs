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
        'premium-gold': '#FFD700',
        'premium-silver': '#C0C0C0',
        'premium-black': '#1A1A1A',
      },
    },
  },
  plugins: [],
} 