/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fold-unfold': 'fold-unfold 1s ease-out forwards',
      },
      keyframes: {
        'fold-unfold': {
          '0%': { transform: 'rotate(12deg) scale(0.95)', opacity: '0' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
