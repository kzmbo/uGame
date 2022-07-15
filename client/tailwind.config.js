/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#151515',
        'blue': '#6AC9FB',
        'white': '#E4E4E4',
        'red': '#cc0000',
        'green': '#50C878'
      }
    },
  },
  plugins: [],
}
