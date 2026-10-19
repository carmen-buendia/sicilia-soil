// packages/db/src/client.ts

import initSqlJs, { type Database } from "sql.js";
import { drizzle, type SQLJsDatabase } from "drizzle-orm/sql-js";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------

const DB_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "sicilia-soil.db");

// ---------------------------------------------------------------------------
// Create / load database
// ---------------------------------------------------------------------------

let _sqlite: Database | null = null;
let _db: SQLJsDatabase<typeof schema> | null = null;

export async function createDb(): Promise<SQLJsDatabase<typeof schema>> {
  if (_db) return _db;

  // 1. Buscar el archivo .wasm manualmente para evitar que Turbopack rompa la ruta
  let wasmBinary: ArrayBuffer | undefined;

  // Rutas posibles dependiendo de desde dónde se ejecute Next.js
  const pathsToTry = [
    path.resolve(process.cwd(), "public", "sql-wasm.wasm"), // Si corre desde apps/web
    path.resolve(process.cwd(), "apps", "web", "public", "sql-wasm.wasm"), // Si corre desde la raíz
    path.resolve(
      process.cwd(),
      "node_modules",
      ".pnpm",
      "sql.js@1.14.2",
      "node_modules",
      "sql.js",
      "dist",
      "sql-wasm.wasm",
    ),
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      const buffer = fs.readFileSync(p);
      // Convertimos el Buffer a ArrayBuffer (lo que espera sql.js)
      wasmBinary = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      );
      break;
    }
  }

  if (!wasmBinary) {
    throw new Error(
      "No se pudo encontrar sql-wasm.wasm en ninguna ruta conocida.",
    );
  }

  // 2. Inicializar SQL pasándole el binario directamente
  const SQL = await initSqlJs({
    wasmBinary, // <--- ESTO ES MAGIA
  });

  // Ensure data directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  // Load existing DB or create a fresh one
  let fileBuffer: Buffer | undefined;
  if (fs.existsSync(DB_PATH)) {
    fileBuffer = fs.readFileSync(DB_PATH);
  }

  _sqlite = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();
  _db = drizzle(_sqlite, { schema });

  return _db;
}

// ---------------------------------------------------------------------------
// Persist to disk
// ---------------------------------------------------------------------------

export function saveDb(): void {
  if (!_sqlite) {
    throw new Error("Database not initialized. Call createDb() first.");
  }
  const data = _sqlite.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export function getSqlite(): Database {
  if (!_sqlite) {
    throw new Error("Database not initialized. Call createDb() first.");
  }
  return _sqlite;
}

export const DB_FILE_PATH = DB_PATH;
export type Db = SQLJsDatabase<typeof schema>;
