import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  rmSync,
} from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const appRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const maplibrePackageJson = require.resolve("maplibre-gl/package.json", {
  paths: [appRoot],
});
const maplibreDist = path.join(path.dirname(maplibrePackageJson), "dist");
const publicDir = path.join(appRoot, "public", "maplibre");

const files = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

// Limpia versiones antiguas para evitar caché stale
if (existsSync(publicDir)) {
  for (const f of readdirSync(publicDir)) {
    rmSync(path.join(publicDir, f), { force: true });
  }
}

mkdirSync(publicDir, { recursive: true });

let failed = false;
for (const file of files) {
  const source = path.join(maplibreDist, file);
  if (!existsSync(source)) {
    console.error(`✗ Not found: ${source}`);
    failed = true;
    continue;
  }
  copyFileSync(source, path.join(publicDir, file));
  console.log(`✓ Copied ${file} → public/maplibre/`);
}

if (failed) {
  console.error(
    "[copy-maplibre-workers] Failed. The map will render as a blank canvas.",
  );
  process.exit(1);
}
