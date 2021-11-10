module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#0d1117',
        'dark-nav': '#161b22',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
