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
          surface: '#0A1628',
          surfaceLight: '#112240',
          border: '#1E3A5F',
          cyan: '#00E5FF',
          emerald: '#50C878',
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
