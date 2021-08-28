const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
 mode:"jit",
  purge: ["src/*.html","src/*/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
