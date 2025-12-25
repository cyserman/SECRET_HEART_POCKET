/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Playfair Display', 'serif'],
      },
      colors: {
        // Cozy nighttime palette - indigo/blue base with warm amber/peach accents
        night: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4b8fc',
          400: '#8193f8',
          500: '#6370f2',
          600: '#4f4ee8', // Primary indigo
          700: '#3d3bd4',
          800: '#2e2fb3',
          900: '#2a2a8f',
          950: '#1a1a52', // Deep night
        },
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74', // Soft peach
          400: '#fb923c', // Warm amber
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
}

