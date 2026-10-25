// packages/db/src/client.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Keep a single in-memory instance to avoid exhausting connections
let _db: LibSQLDatabase<typeof schema> | null = null;

function initDb(): LibSQLDatabase<typeof schema> {
  if (_db) return _db;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      "❌ TURSO_DATABASE_URL is not defined. Check your .env.local or Vercel environment variables.",
    );
  }

  const turso = createClient({ url, authToken });
  _db = drizzle(turso, { schema });
  return _db;
}

// ─── Backward compatibility exports ─────────────────────────────────

// Async factory expected by some legacy queries
export async function createDb() {
  return initDb();
}

// Getter to lazily access the database instance
export function getDb() {
  return initDb();
}

// Turso persists changes automatically, so this "save" is a no-op
export function saveDb() {
  // No-op
}

// Legacy stub to prevent old imports from breaking
export function getSqlite() {
  throw new Error(
    "getSqlite is no longer available. Use `createDb()` or `getDb()` instead.",
  );
}

export const DB_FILE_PATH = ":turso:";
export type Db = LibSQLDatabase<typeof schema>;
