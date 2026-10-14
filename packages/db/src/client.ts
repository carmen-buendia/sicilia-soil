// packages/db/src/client.ts

// ============================================================================
// MycoMesh Protocol — Database client
// ----------------------------------------------------------------------------
// sql.js: SQLite compiled to WebAssembly.
// - Zero native compilation (no Python, no Visual Studio)
// - ~600 KB download
// - Works on any Windows/Mac/Linux
//
// Trade-off: sql.js keeps the DB in memory; we persist to disk manually
// via saveDb() after mutations. For dev, this is fine.
// ============================================================================

import initSqlJs, { type Database } from "sql.js";
import { drizzle, type SQLJsDatabase } from "drizzle-orm/sql-js";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------

// Resolve DB path relative to packages/db root
const DB_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "sicilia-soil.db");

// ---------------------------------------------------------------------------
// Create / load database
// ---------------------------------------------------------------------------

let _sqlite: Database | null = null;
let _db: SQLJsDatabase<typeof schema> | null = null;

export async function createDb(): Promise<SQLJsDatabase<typeof schema>> {
  if (_db) return _db;

  // Load sql.js WASM module
  const SQL = await initSqlJs();

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
