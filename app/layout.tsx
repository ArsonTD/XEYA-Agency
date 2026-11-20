import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/index.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500;700&family=Urbanist:wght@300..800&display=swap";

/** Título del sitio: pestaña del inicio y vista previa al compartir */
const SITE_TITLE = "XEYA | The Future is Here!";

const DESCRIPTION =
  "XEYA — Innovación que transforma negocios y crea oportunidades. Desarrollo de aplicaciones web, móviles y de escritorio, diseño web y gráfico.";

export const metadata: Metadata = {
  // Dirección pública del sitio: con ella se forman los enlaces absolutos (p. ej. la imagen al compartir)
  metadataBase: new URL("https://xeya.com.do"),
  // Cada página pone su parte ("Política de privacidad | XEYA"); el inicio usa el título completo
  title: { default: SITE_TITLE, template: "%s | XEYA" },
  description: DESCRIPTION,
  // Vista previa al compartir un enlace (WhatsApp, Telegram, LinkedIn, X…).
  // La imagen la genera app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    siteName: "XEYA",
    title: SITE_TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "es_DO",
  },
  twitter: { card: "summary_large_image" },
  // Icono de la pestaña: SVG para navegadores actuales y .ico de respaldo.
  // El de iOS lo genera app/apple-icon.tsx.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#02080e",
};

/** Documento común a todas las páginas: idioma, tipografías y estilos globales. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={FONTS} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
