module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#0d1117',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
