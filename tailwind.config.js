/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: { bg: '#FAF1E6', surface: '#FDFAF6', secondary: '#E4EFE7', primary: '#99BC85' },
        dark: { bg: '#1A1D1A', surface: '#252925', secondary: '#3A4535', primary: '#789965' },
      },
      fontFamily: {
        arabic: ['"Amiri"', 'serif'],
      }
    },
  },
  plugins: [],
}