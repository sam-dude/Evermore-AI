/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        evermore: {
          bg: '#050B14',
          bgAlt: '#090E17',
          surface: '#0A1628',
          surfaceLight: '#112240',
          surfaceGlass: 'rgba(10, 22, 40, 0.85)',
          border: '#1E3A5F',
          borderLight: '#253D5B',
          cyan: '#00E5FF',
          cyanMuted: '#00B4D8',
          emerald: '#50C878',
          amber: '#F59E0B',
          rose: '#F43F5E',
          text: '#E2E8F0',
          muted: '#94A3B8',
          card: '#0A1628',
          cardHover: '#112240',
        },
      },
    },
  },
  plugins: [],
};
