const fs = require("fs");
const path = require("path");

const webPackagePath = path.join(__dirname, "apps/web/package.json");
const webPackage = require(webPackagePath);

// Convertir workspace:* a file:../../packages/...
if (webPackage.dependencies) {
  Object.keys(webPackage.dependencies).forEach((dep) => {
    if (webPackage.dependencies[dep] === "workspace:*") {
      const packageName = dep.replace("@sicilia-soil/", "");
      webPackage.dependencies[dep] = `file:../../packages/${packageName}`;
      console.log(`✅ Converted ${dep} -> file:../../packages/${packageName}`);
    }
  });
}

fs.writeFileSync(webPackagePath, JSON.stringify(webPackage, null, 2));
console.log("✅ Package.json updated for Vercel");
