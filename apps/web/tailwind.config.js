/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F9F6F0",
        ink: "#2B363C",
        solar: "#E69A45",
        chloro: "#4F7A5C",
        "paper-dark": "#EBE6DA",
        // Compatibilidad
        oliveGreen: "#4F7A5C",
        wheatGold: "#E69A45",
        offWhite: "#F9F6F0",
        charcoalGray: "#2B363C",
        "sicilian-red": "#C05A3E",
        "sicilian-yellow": "#F9F9F6",
      },
      fontFamily: {
        // font-sans: Inter (Legibilidad total para UI)
        sans: ["var(--font-sans)", "sans-serif"],
        // font-serif: Lora (Elegancia para Títulos h1, h2, h3)
        serif: ["var(--font-serif)", "serif"],
        // font-mono: JetBrains (Datos numéricos y etiquetas pequeñas)
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #2B363C",
        "brutal-hover": "2px 2px 0px #2B363C",
        "brutal-solar": "4px 4px 0px #E69A45",
        "brutal-chloro": "4px 4px 0px #4F7A5C",
      },
    },
  },
  plugins: [],
};
