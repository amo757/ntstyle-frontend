/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#555555',
      },
      fontFamily: {
        // Net-A-Porter სტილი:
        serif: ['"Bodoni Moda"', 'serif'], // სათაურებისთვის
        sans: ['"Inter"', 'sans-serif'],   // ტექსტისთვის
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') 
  ],
}