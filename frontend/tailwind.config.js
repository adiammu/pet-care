/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e6efff',
          200: '#c5dbff',
          300: '#9fc2ff',
          400: '#6ea0ff',
          500: '#3b7bff',
          600: '#255fee',
          700: '#1d4acc',
          800: '#1b3ea3',
          900: '#1a347e'
        }
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
};


