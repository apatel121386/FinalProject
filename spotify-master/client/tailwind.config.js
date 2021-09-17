module.exports = {
  // purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        plst: 'repeat(auto-fit, minmax(200px, 1fr));',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
