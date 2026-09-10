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
};

module.exports = nextConfig;
