/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
          poppins: ["Poppins", "sans-serif"],
      },
      height: {
          "1/10": "6%",
          "9/10": "94%",
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
        '35': '35rem', 
        '45': '45rem',  
        '46': '46rem',
        '47': '47rem', 
        '48': '48rem',
        '49': '49rem',
        '50': '50rem'
      },
      minHeight: {
        '30': '30rem',
        '31': '31rem',
        '32': '32rem',
        '33' : '33rem',
        '34': '34rem',
        '35': '35rem', 
        '45': '45rem',  
        '46': '46rem',
        '47': '47rem', 
        '48': '48rem',
        '49': '49rem',
        '50': '50rem'
      },
  },
  },
  plugins: [],
}

