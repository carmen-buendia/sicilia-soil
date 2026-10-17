/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oliveGreen: "#1A3C34",
        wheatGold: "#D98E32",
        offWhite: "#FDFBF7",
        charcoalGray: "#2C3E50",
        "sicilian-red": "#A64B2A",
        "sicilian-yellow": "#F9F9F6",
      },
    },
  },
  plugins: [],
};
