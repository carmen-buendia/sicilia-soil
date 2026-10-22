const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  serverExternalPackages: ["sql.js"],
  outputFileTracingIncludes: {
    "/*": ["./public/sql-wasm.wasm"],
  },
  transpilePackages: [
    "@sicilia-soil/core",
    "@sicilia-soil/db",
    "@sicilia-soil/ui",
    "@sicilia-soil/utils",
    "@isola-node/rule-engine",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["sql.js"] = false;
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    config.externals = [...(config.externals || []), "sql.js"];
    return config;
  },
};

module.exports = nextConfig;
