/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ['./public/index.html']
  },
  theme: {
    extend: {
      colors: {
        avocado: "#8df1ab"
      }
    },
  },
  plugins: [require("../../src/index")],
}
