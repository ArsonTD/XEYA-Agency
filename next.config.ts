import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio corre con Node (los formularios envían correo desde el servidor).
  // "standalone" deja en .next/standalone todo lo necesario para ejecutarlo sin node_modules.
  output: "standalone",
  // La carpeta del proyecto es la raíz: evita que Next tome otra por un package-lock ajeno
  outputFileTracingRoot: process.cwd(),
  // Las imágenes se sirven tal cual, sin optimizador
  images: { unoptimized: true },
};

export default nextConfig;
