import { ImageResponse } from "next/og";
import { FaviconMark } from "./_brand/mark";

/*
 * Imagen que muestran WhatsApp, Telegram, LinkedIn, X… al compartir un enlace del sitio:
 * el mismo logo que el icono de la pestaña. Se genera al compilar.
 */

export const alt = "XEYA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<FaviconMark size={600} />, size);
}
