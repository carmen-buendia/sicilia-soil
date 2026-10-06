const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Esto le dice a Turbopack dónde está la raíz del monorepo
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  // Transpila los paquetes internos que exportan TS crudo
  transpilePackages: [
    "@sicilia-soil/core",
    "@sicilia-soil/ui",
    "@sicilia-soil/utils",
  ],
};

module.exports = nextConfig;
