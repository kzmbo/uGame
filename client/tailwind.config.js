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
        'dark-blue': '#16758A',
        'white': '#E4E4E4',
        'dashboard-card-w': '#DADADA',
        'dark-white': '#CACACA', 
        'red': '#cc0000',
        'green': '#50C878'
      }
    },
  },
  plugins: [],
}
