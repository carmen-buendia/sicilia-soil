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

// 🚨 PEGA AQUÍ EL CONTENIDO EXACTO DE TU ARCHIVO .SQL
// (Copia y pega entre los backticks ``)
const MIGRATION_SQL = `
-- Ejemplo (reemplázalo con tu SQL real):
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  createdAt INTEGER,
  lastLoginAt INTEGER
);
--> statement-breakpoint
`;

/**
 * Función que se ejecuta en Vercel (en memoria)
 */
export function runMigrations(sqlite: Database) {
  const statements = MIGRATION_SQL.split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  for (let i = 0; i < statements.length; i++) {
    try {
      sqlite.run(statements[i]);
    } catch (err: any) {
      // Ignoramos errores si la tabla ya existe
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
    console.log("→ DB existente, cargando...");
    fileBuffer = fs.readFileSync(DB_PATH);
  } else {
    console.log("→ DB nueva, creando...");
  }

  const sqlite = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();

  console.log(`→ Leyendo ${MIGRATION_FILE}...`);
  if (!fs.existsSync(MIGRATION_FILE)) {
    console.error(`✗ No se encontró la migración: ${MIGRATION_FILE}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(MIGRATION_FILE, "utf8");
  const statements = sqlContent
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(`→ Aplicando ${statements.length} statements...`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      sqlite.run(stmt);
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

// Solo ejecuta la CLI si se llama directamente desde la terminal
if (require.main === module) {
  migrateCli().catch((err) => {
    console.error("✗ Error en migración CLI:", err);
    process.exit(1);
  });
}
