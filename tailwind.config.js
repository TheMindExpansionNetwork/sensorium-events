/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          metallic: '#D4AF37',
          light: '#F3E5AB'
        },
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          glow: '#00F5D4',
          deep: '#0F2B2B'
        },
        sacred: {
          dark: '#070B0E',
          surface: '#0E161C',
          border: '#1E2D38'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
