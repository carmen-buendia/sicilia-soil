// packages/db/drizzle.config.ts

import { defineConfig } from "drizzle-kit";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), "../../apps/web/.env.local");

try {
  const envContent = readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts
          .join("=")
          .trim()
          .replace(/^["']|["']$/g, "");
      }
    }
  });
  console.log("✅ Variables de entorno cargadas desde apps/web/.env.local");
} catch (error) {
  console.error("❌ No se pudo leer apps/web/.env.local");
  throw error;
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
});
