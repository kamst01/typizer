const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      green: colors.green,
      red: colors.red,
      gray: colors.slate,
      sky: colors.sky,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
