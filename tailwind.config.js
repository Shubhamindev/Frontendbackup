/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cloud-blue': '#6AB7F5', // Light blue for the cloud
        'cloud-pink': '#F06292', // Pink for the dot
        'cloud-dark': '#1A3C5E', // Dark blue for the text
      },
    },
  },
  plugins: [],
}