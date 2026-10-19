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
        // Paleta "Solarpunk Book"
        paper: "#F8F7F2", // Fondo principal (blanco roto cálido, como el papel del libro)
        card: "#FFFFFF", // Fondo de tarjetas (blanco puro para contrastar con el fondo)
        ink: "#2C352C", // Texto principal (verde oscuro casi negro)
        chloro: "#618C69", // Verde hoja (como los árboles de la ilustración)
        solar: "#DCA354", // Amarillo sol (como la luz en la portada)
        border: "#D6D9D0", // Bordes finos de tinta (gris verdoso muy sutil)

        // Compatibilidad
        oliveGreen: "#618C69",
        wheatGold: "#DCA354",
        offWhite: "#F8F7F2",
        charcoalGray: "#2C352C",
        "sicilian-red": "#C05A3E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"], // Lora, para títulos elegantes
        mono: ["var(--font-mono)", "monospace"], // JetBrains Mono, para datos técnicos
      },
      boxShadow: {
        // Eliminamos las sombras de "app" y usamos sombras de papel
        paper: "0 1px 3px rgba(44, 53, 44, 0.05)",
        "paper-hover": "0 4px 12px rgba(44, 53, 44, 0.08)",
      },
    },
  },
  plugins: [],
};
