/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        butter: '#FFF7AD',
        espresso: '#1A0F0E',
        blush: '#FF9494',
        sage: '#C1D0B5',
        cream: '#FAF9F6',
      },
    },
  },
  plugins: [],
}
