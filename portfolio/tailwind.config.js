/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#333333",
          Primary: "#0f0f0f",
          Secondary: "#0e750e",
          lightGray : "#999999",
          veryLightGray : "#ccbfbe",
        }
      }
    },
  },
  plugins: [],
}