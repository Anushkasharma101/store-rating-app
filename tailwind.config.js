/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        LaBelleAurore: ['La Belle Aurore', 'cursive'],
        lato:['Lato','sans-serif'],
      },
    },
  },
  plugins: [],
}

