const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing package.json for Vercel deployment...');

// Ruta al package.json de web
const webPackagePath = path.join(__dirname, '..', 'apps', 'web', 'package.json');

// Verificar que el archivo existe
if (!fs.existsSync(webPackagePath)) {
  console.error('❌ apps/web/package.json not found!');
  process.exit(1);
}

// Leer package.json
const webPackage = JSON.parse(fs.readFileSync(webPackagePath, 'utf8'));

let modified = false;

// Convertir dependencias workspace:* a file:../../packages/...
if (webPackage.dependencies) {
  Object.keys(webPackage.dependencies).forEach(dep => {
    if (webPackage.dependencies[dep] === 'workspace:*') {
      // Extraer el nombre del paquete (ej: @sicilia-soil/core -> core)
      const packageName = dep.replace('@sicilia-soil/', '');
      const newPath = `file:../../packages/${packageName}`;
      webPackage.dependencies[dep] = newPath;
      console.log(`✅ Converted ${dep} -> ${newPath}`);
      modified = true;
    }
  });
}

// También convertir devDependencies si las hay
if (webPackage.devDependencies) {
  Object.keys(webPackage.devDependencies).forEach(dep => {
    if (webPackage.devDependencies[dep] === 'workspace:*') {
      const packageName = dep.replace('@sicilia-soil/', '');
      const newPath = `file:../../packages/${packageName}`;
      webPackage.devDependencies[dep] = newPath;
      console.log(`✅ Converted ${dep} (dev) -> ${newPath}`);
      modified = true;
    }
  });
}

if (modified) {
  // Guardar el archivo modificado
  fs.writeFileSync(webPackagePath, JSON.stringify(webPackage, null, 2));
  console.log('✅ package.json updated for Vercel');
} else {
  console.log('ℹ️ No workspace:* dependencies found. Nothing to change.');
}
