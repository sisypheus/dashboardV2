module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'dark-sidebar': '#22272e',
        'dark-nav': '#2d333b',
        'dark': '#1c2128',
        'light-sidebar': '#c5c8c8',
        'light-nav': '#18415d',
        'light': '#dbdbdb',
        'widgets': '#2d333b'
      },
      textColor: {
        'orange': '#faae5e',
        'green': '#50a38a',
        'purple': '#7e8ce0',
        'blue': '#48c7d0',
        'saumon': '#f7a38e',
        'red' :'#df4576',
        'text': '#506477',
        'sidebar': '#687078',
      },
      color: ['checked'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
