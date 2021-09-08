const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.warmGray,
      sky: colors.sky,
      white: 'white',
      black: 'black',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
