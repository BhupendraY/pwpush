/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 10px 30px rgba(79, 70, 229, 0.35)',
      },
    },
  },
  plugins: [],
}

