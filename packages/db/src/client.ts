// packages/db/src/client.ts

import initSqlJs, { type Database } from "sql.js";
import { drizzle, type SQLJsDatabase } from "drizzle-orm/sql-js";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";
import { runMigrations } from "./migrate"; // <-- Importamos la función

const DB_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "sicilia-soil.db");

let _sqlite: Database | null = null;
let _db: SQLJsDatabase<typeof schema> | null = null;

export async function createDb(): Promise<SQLJsDatabase<typeof schema>> {
  if (_db) return _db;

  let wasmBinary: ArrayBuffer | undefined;

  const pathsToTry = [
    path.resolve(process.cwd(), "public", "sql-wasm.wasm"),
    path.resolve(process.cwd(), "apps", "web", "public", "sql-wasm.wasm"),
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
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      const buffer = fs.readFileSync(/*turbopackIgnore: true*/ p);
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

  const SQL = await initSqlJs({ wasmBinary });

  let fileBuffer: Buffer | undefined;

  // Solo leemos del disco en local
  if (process.env.NODE_ENV !== "production") {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_PATH)) {
      fileBuffer = fs.readFileSync(DB_PATH);
    }
  }

  _sqlite = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();

  // 🚨 AQUÍ SE CREAN LAS TABLAS EN MEMORIA (PARA VERCEL)
  runMigrations(_sqlite);

  _db = drizzle(_sqlite, { schema });

  return _db;
}

export function saveDb(): void {
  // Si estamos en producción, no escribimos en disco
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (!_sqlite) {
    throw new Error("Database not initialized. Call createDb() first.");
  }
  const data = _sqlite.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export function getSqlite(): Database {
  if (!_sqlite) {
    throw new Error("Database not initialized. Call createDb() first.");
  }
  return _sqlite;
}

export const DB_FILE_PATH = DB_PATH;
export type Db = SQLJsDatabase<typeof schema>;
