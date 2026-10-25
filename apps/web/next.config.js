const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },

  // Le dice a Next.js que no empaquete estas librerías nativas
  serverExternalPackages: ["@libsql/client", "libsql"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },

  transpilePackages: [
    "@sicilia-soil/core",
    "@sicilia-soil/db",
    "@sicilia-soil/ui",
    "@sicilia-soil/utils",
    "@isola-node/rule-engine",
  ],

  //FUERZA BRUTA PARA WEBPACK
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@libsql/client", "libsql");
    } else {
      // Si por algún motivo intenta cargarse en el cliente, lo sustituimos por un objeto vacío
      config.resolve.alias = {
        ...config.resolve.alias,
        "@libsql/client": false,
        libsql: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
