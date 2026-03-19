/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sicilia: {
          orange: "#F59E0B",
          blue: "#3B82F6",
          green: "#10B981",
          red: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};
