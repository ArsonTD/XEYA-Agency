/*
 * Prepara lo que se sube al servidor después de `next build`.
 *
 * Next deja el servidor en .next/standalone, pero sin los archivos estáticos (.next/static)
 * ni la carpeta public. Este script lo junta todo en `release/` (se puede ejecutar con
 * `npm start`) y lo empaqueta en `release.tgz`, el único archivo que hay que subir.
 */
import { execFileSync } from "node:child_process";
import { cp, rm, stat } from "node:fs/promises";

const RELEASE = "release";
const ARCHIVE = "release.tgz";

try {
  await stat(".next/standalone/server.js");
} catch {
  console.error("No encuentro .next/standalone/server.js: ejecuta antes `next build`.");
  process.exit(1);
}

await rm(RELEASE, { recursive: true, force: true });
await rm(ARCHIVE, { force: true });
await cp(".next/standalone", RELEASE, { recursive: true });
await cp(".next/static", `${RELEASE}/.next/static`, { recursive: true });
await cp("public", `${RELEASE}/public`, { recursive: true });
// Las credenciales no viajan dentro del paquete: en el servidor van en su propio archivo .env
for (const file of [".env", ".env.local", ".env.production", ".env.production.local"]) {
  await rm(`${RELEASE}/${file}`, { force: true });
}

// `tar` viene con Windows 10+, macOS y Linux
execFileSync("tar", ["-czf", ARCHIVE, "-C", RELEASE, "."], { stdio: "inherit" });
const { size } = await stat(ARCHIVE);
console.log(`Listo para subir: ${ARCHIVE} (${(size / 1024 / 1024).toFixed(1)} MB)`);
