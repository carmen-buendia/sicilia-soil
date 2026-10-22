const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para el monorepo
  turbopack: {
    root: path.join(__dirname, "../.."),
  },

  // Transpilamos los paquetes internos
  transpilePackages: [
    "@sicilia-soil/core",
    "@sicilia-soil/db",
    "@sicilia-soil/rule-engine",
    "@sicilia-soil/ui",
    "@sicilia-soil/utils",
  ],
};

module.exports = nextConfig;
