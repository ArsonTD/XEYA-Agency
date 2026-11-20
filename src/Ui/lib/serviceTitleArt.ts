/*
 * Arte de los títulos de servicios. El carrusel FlexCarousel solo recibe
 * imágenes, así que cada título se dibuja en un canvas y se entrega como data URL.
 *
 * El fondo es negro puro a propósito: el carrusel se pinta con mezcla "screen",
 * donde el negro desaparece y solo queda el texto sobre el fondo de la página.
 */

const DISPLAY = "Archivo, 'Helvetica Neue', Arial, sans-serif";
const WHITE = "#ffffff";
const LASER = "#46c8ff";

/** Tamaño de letra del dibujo (el carrusel lo reduce: así queda nítido en pantallas densas) */
const FONT_SIZE = 160;
const LINE_HEIGHT = FONT_SIZE * 0.94;
/*
 * Márgenes como fracción de la tarjeta. El carrusel amplía cada imagen un 8 % y la
 * desplaza con el movimiento, así que recorta hasta un 7,4 % por lado: el texto
 * necesita quedar más adentro que eso.
 */
const PAD_X = 0.1;
const PAD_Y = 0.12;

export interface TitleCard {
  /** Imagen del título, como data URL */
  src: string;
  /** Ancho ÷ alto de la imagen: el carrusel respeta esta proporción */
  aspect: number;
}

const font = `900 expanded ${FONT_SIZE}px ${DISPLAY}`;

/** Espera a que la tipografía esté lista para que el canvas pueda usarla. */
export async function prepareTitleFont() {
  if (!document.fonts?.load) return;
  await Promise.allSettled([document.fonts.load(font)]);
}

/** "Aplicaciones de escritorio" → ["APLICACIONES", "DE ESCRITORIO"] */
function splitTitle(title: string): string[] {
  const words = title.trim().toUpperCase().split(/\s+/);
  if (words.length < 2) return words;
  return [words[0], words.slice(1).join(" ")];
}

/** Dibuja un título en dos líneas: la primera en blanco y la segunda en azul láser. */
export function renderTitleCard(title: string): TitleCard {
  const lines = splitTitle(title);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D no disponible");

  ctx.font = font;
  const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
  const textHeight = lines.length * LINE_HEIGHT;

  canvas.width = Math.ceil(textWidth / (1 - 2 * PAD_X));
  canvas.height = Math.ceil(textHeight / (1 - 2 * PAD_Y));

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cambiar el tamaño del canvas reinicia el contexto: hay que volver a fijar la fuente
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const top = (canvas.height - textHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillStyle = i === lines.length - 1 && lines.length > 1 ? LASER : WHITE;
    ctx.fillText(line, canvas.width / 2, top + LINE_HEIGHT * (i + 0.5));
  });

  return { src: canvas.toDataURL("image/png"), aspect: canvas.width / canvas.height };
}
