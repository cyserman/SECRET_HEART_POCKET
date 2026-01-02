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
        // Consider adding a more storybook-friendly font like:
        // story: ['Comic Neue', 'Quicksand', 'Nunito', 'system-ui', 'sans-serif'],
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
          950: '#1a1a52', // Deep night - softer than pure black
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
        // Additional warm tones for variety
        warmth: {
          cream: '#fef3e2',
          butter: '#fde8c3',
          honey: '#f9d89c',
          caramel: '#e8b882',
        },
        // Soft accent colors for badges and highlights
        soft: {
          lavender: '#e0d4f7',
          mint: '#d4f7e0',
          rose: '#f7d4e0',
          sky: '#d4e8f7',
        }
      },
      borderRadius: {
        'cozy': '1.5rem',
        'story': '2rem',
        'bedtime': '2.5rem',
      },
      boxShadow: {
        'glow-ember': '0 0 30px rgba(251, 146, 60, 0.25)',
        'glow-ember-soft': '0 0 20px rgba(251, 146, 60, 0.15)',
        'glow-night': '0 0 30px rgba(79, 78, 232, 0.2)',
        'cozy': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'cozy-lg': '0 12px 48px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'bedtime': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'cozy': '20px',
        'story': '24px',
      },
      spacing: {
        'cozy': '1.5rem',
        'story': '2rem',
      },
      animation: {
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(251, 146, 60, 0.25)',
            opacity: '1',
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(251, 146, 60, 0.4)',
            opacity: '0.9',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
