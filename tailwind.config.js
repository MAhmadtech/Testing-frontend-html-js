/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      primary: "#005666",
      secondary: "#FF765B",
      info: "#88C1BA",
      disableBg: "#E5E7E7",
      customgray: "#FBFBFB",
    },},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.custom-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#006D81 #FFFFFF',
        },
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#006D81',
          borderRadius: '10px',
          border: '2px solid #B5B6B6',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: '#B5B6B6',
          borderRadius: '2px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#005666',
        },
      });
    },
  ],
}