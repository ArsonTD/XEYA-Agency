import { ImageResponse } from "next/og";
import { FaviconMark } from "./_brand/mark";

/* Icono al guardar el sitio en la pantalla de inicio (iPhone, iPad): el logo de la pestaña. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<FaviconMark size={170} bold={22} />, size);
}
