const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      green: colors.green,
      red: colors.red,
      gray: colors.warmGray,
      sky: colors.sky,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
