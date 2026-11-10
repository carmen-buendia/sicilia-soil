// apps/web/next.config.mjs
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },

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
    "@isola-node/adapters",
  ],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@libsql/client", "libsql");
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@libsql/client": false,
        libsql: false,
      };
    }

    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      ".js": [".ts", ".tsx", ".js"],
    };

    return config;
  },
};

export default nextConfig;
