/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
          poppins: ["Poppins", "sans-serif"],
      },
      height: {
          "1/10": "10%",
          "9/10": "90%",
      },
      backgroundColor: {
          "app-black": "#121212",
      },
      maxHeight: {
        '30': '30rem',
        '31': '31rem',
        '32': '32rem',
        '33' : '33rem',
        '34': '34rem',
        '35': '35rem'     
      },
      minHeight: {
        '30': '30rem',
        '31': '31rem',
        '32': '32rem',
        '33' : '33rem',
        '34': '34rem',
        '35': '35rem'
      },
  },
  },
  plugins: [],
}

