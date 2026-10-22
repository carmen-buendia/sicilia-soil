// packages/db/src/migrate.ts

import initSqlJs, { type Database } from "sql.js";
import fs from "node:fs";
import path from "node:path";

const DB_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "sicilia-soil.db");
const MIGRATION_FILE = path.resolve(
  process.cwd(),
  "drizzle/0000_married_songbird.sql",
);

const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  email_verified_at TEXT,
  name TEXT NOT NULL,
  locale TEXT,
  timezone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  status TEXT NOT NULL DEFAULT 'active',
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS user_credentials (
  user_id TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  password_updated_at TEXT NOT NULL,
  mfa_enabled INTEGER NOT NULL DEFAULT 0,
  mfa_secret TEXT,
  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT
);
`;

export function runMigrations(sqlite: Database) {
  const statements = MIGRATION_SQL.split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  for (let i = 0; i < statements.length; i++) {
    try {
      sqlite.run(statements[i]);
    } catch (err: any) {
      if (!err.message.includes("already exists")) {
        console.warn(
          `⚠️ Aviso en migración (statement ${i + 1}):`,
          err.message,
        );
      }
    }
  }
}

/**
 * Script CLI para ejecutar en local (pnpm db:migrate)
 */
async function migrateCli() {
  console.log("→ Cargando sql.js...");
  const SQL = await initSqlJs();

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  let fileBuffer: Buffer | undefined;
  if (fs.existsSync(DB_PATH)) {
    fileBuffer = fs.readFileSync(DB_PATH);
  }

  const sqlite = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();

  const sqlContent = fs.readFileSync(MIGRATION_FILE, "utf8");
  const statements = sqlContent
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  for (let i = 0; i < statements.length; i++) {
    try {
      sqlite.run(statements[i]);
    } catch (err: any) {
      if (!err.message.includes("already exists")) {
        console.error(`✗ Error en statement ${i + 1}:`, err.message);
      }
    }
  }

  const data = sqlite.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  console.log(`✓ Migración aplicada: ${DB_PATH}`);
}

if (require.main === module) {
  migrateCli().catch((err) => {
    console.error("✗ Error en migración CLI:", err);
    process.exit(1);
  });
}
