/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#38aef7',
          500: '#0e94e7',
          600: '#0276c9',
          700: '#025ea3',
          800: '#065186',
          900: '#0b436f',
          950: '#072b4a',
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(14, 148, 231, 0.15)',
        'premium-hover': '0 20px 40px -15px rgba(14, 148, 231, 0.25)',
      }
    },
  },
  plugins: [],
}
