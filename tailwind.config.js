module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        primary: "#303030",
        'primary-light': "#000000",
        'primary-dark': "#000000",
        "primary-foreground": "#ffffff",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};