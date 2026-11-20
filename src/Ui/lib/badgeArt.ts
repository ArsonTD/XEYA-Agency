import {
  LETTER_BOX,
  LETTER_STROKES,
  MARK_BOX,
  MARK_LINE,
  MARK_SHARDS,
} from "@/Ui/components/brand/logoArt";

/*
 * Arte de las credenciales del equipo. El componente Lanyard recibe imágenes,
 * así que cada cara se dibuja en un canvas y se entrega como data URL.
 *
 *  - Frente: la foto de la persona, su nombre y su cargo.
 *  - Reverso: la X de XEYA y el logotipo.
 *  - Cinta: la X y el logotipo, repetidos.
 */

/** Proporción de la tarjeta vertical del Lanyard: 1.6 × 2.25 */
const W = 1024;
const H = 1440;
const MARGIN = 84;

const PANEL = "#06121c";
const BEAM = "#1f7fd6";
const LASER = "#46c8ff";
const BRAND_BLUE = "#0563a8";
const WHITE = "#ffffff";

const DISPLAY = "Archivo, 'Helvetica Neue', Arial, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

export interface BadgePerson {
  name: string;
  role: string;
  photo: string;
}

export interface BadgeArt {
  front: string;
  back: string;
}

function newCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D no disponible");
  return { canvas, ctx };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

/** Espera a que las tipografías estén listas para que el canvas pueda usarlas. */
export async function prepareBadgeFonts() {
  if (!document.fonts?.load) return;
  await Promise.allSettled([
    document.fonts.load(`900 expanded 100px ${DISPLAY}`),
    document.fonts.load(`500 30px ${MONO}`),
  ]);
}

/** Isotipo centrado en (cx, cy) con la altura dada. */
function drawMark(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  height: number,
  colors: { line: string; shards: string; glow?: string },
) {
  const scale = height / MARK_BOX.height;
  ctx.save();
  ctx.translate(cx - (MARK_BOX.width * scale) / 2, cy - height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-MARK_BOX.x, -MARK_BOX.y);
  if (colors.glow) {
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = height * 0.09;
  }
  ctx.fillStyle = colors.shards;
  for (const d of MARK_SHARDS) ctx.fill(new Path2D(d));
  ctx.shadowBlur = 0;
  ctx.fillStyle = colors.line;
  ctx.fill(new Path2D(MARK_LINE));
  ctx.restore();
}

/** Logotipo X E Y A centrado en (cx, cy) con la altura dada. */
function drawWordmark(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  height: number,
  color: string,
  gap = 96,
) {
  const scale = height / LETTER_BOX.height;
  const step = LETTER_BOX.width + gap;
  const total = step * 3 + LETTER_BOX.width;
  ctx.save();
  ctx.translate(cx - (total * scale) / 2, cy - height / 2);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  LETTER_STROKES.forEach((strokes, i) => {
    ctx.save();
    ctx.translate(i * step, 0);
    ctx.beginPath();
    ctx.rect(0, 0, LETTER_BOX.width, LETTER_BOX.height);
    ctx.clip();
    for (const { d, width } of strokes) {
      ctx.lineWidth = width;
      ctx.stroke(new Path2D(d));
    }
    ctx.restore();
  });
  ctx.restore();
}

function monoText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  align: CanvasTextAlign = "left",
  size = 30,
) {
  ctx.font = `500 ${size}px ${MONO}`;
  ctx.letterSpacing = `${Math.round(size * 0.16)}px`;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = color;
  ctx.fillText(text.toUpperCase(), x, y);
  ctx.letterSpacing = "0px";
}

function laserLine(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number) {
  ctx.save();
  ctx.shadowColor = LASER;
  ctx.shadowBlur = 22;
  ctx.fillStyle = "#bfeaff";
  ctx.fillRect(x1, y - 1.5, x2 - x1, 3);
  ctx.restore();
}

/** Cabecera común: va a los lados para dejar libre la ranura central de la tarjeta. */
function header(ctx: CanvasRenderingContext2D) {
  monoText(ctx, "XEYA SRL", MARGIN, 190, "rgba(255,255,255,0.6)");
  monoText(ctx, "Equipo", W - MARGIN, 190, LASER, "right");
}

function frame(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = PANEL;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(127,212,255,0.2)";
  ctx.lineWidth = 2;
  ctx.strokeRect(34, 34, W - 68, H - 68);
}

/** Frente: foto, nombre y cargo. */
function drawFront(person: BadgePerson, photo: HTMLImageElement | null) {
  const { canvas, ctx } = newCanvas(W, H);
  frame(ctx);
  header(ctx);

  // Foto: recorte centrado que llena su ventana
  const box = { x: 34, y: 250, width: W - 68, height: 800 };
  if (photo) {
    const scale = Math.max(box.width / photo.width, box.height / photo.height);
    const width = photo.width * scale;
    const height = photo.height * scale;
    ctx.save();
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.width, box.height);
    ctx.clip();
    ctx.drawImage(
      photo,
      box.x + (box.width - width) / 2,
      box.y + (box.height - height) / 2,
      width,
      height,
    );
    ctx.restore();
  } else {
    drawMark(ctx, W / 2, box.y + box.height / 2, 420, { line: WHITE, shards: BEAM });
  }
  laserLine(ctx, box.x, box.x + box.width, box.y + box.height);

  // Nombre en una línea, ajustado al ancho
  const name = person.name.toUpperCase();
  let size = 86;
  ctx.font = `900 expanded ${size}px ${DISPLAY}`;
  size = Math.min(size, Math.floor((size * (W - MARGIN * 2)) / ctx.measureText(name).width));
  ctx.font = `900 expanded ${size}px ${DISPLAY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = WHITE;
  ctx.fillText(name, W / 2, 1200);

  // Cargo, ajustado al ancho
  let roleSize = 34;
  ctx.font = `500 ${roleSize}px ${MONO}`;
  const roleWidth = ctx.measureText(person.role.toUpperCase()).width * 1.28;
  roleSize = Math.min(roleSize, Math.floor((roleSize * (W - MARGIN * 2)) / roleWidth));
  monoText(ctx, person.role, W / 2, 1298, LASER, "center", roleSize);

  return canvas.toDataURL("image/png");
}

/** Reverso: la X y el logotipo XEYA. */
function drawBack() {
  const { canvas, ctx } = newCanvas(W, H);
  frame(ctx);
  header(ctx);

  drawMark(ctx, W / 2, 640, 620, {
    line: WHITE,
    shards: BEAM,
    glow: "rgba(70,200,255,0.75)",
  });
  drawWordmark(ctx, W / 2, 1120, 96, WHITE, 120);

  laserLine(ctx, MARGIN, W - MARGIN, 1262);
  monoText(ctx, "Soluciones digitales", MARGIN, 1330, "rgba(255,255,255,0.6)", "left", 26);
  monoText(ctx, "xeya.com.do", W - MARGIN, 1330, "rgba(255,255,255,0.6)", "right", 26);

  return canvas.toDataURL("image/png");
}

/**
 * Fotos del equipo en las credenciales. Desactivadas por ahora: en su lugar va la X de XEYA.
 * Para volver a mostrarlas basta con poner `true` (las fotos siguen en /public/team).
 */
const SHOW_PHOTOS = false;

/** Las dos caras de la credencial de una persona. */
export async function renderBadge(person: BadgePerson): Promise<BadgeArt> {
  const photo = SHOW_PHOTOS ? await loadImage(person.photo) : null;
  return { front: drawFront(person, photo), back: drawBack() };
}

/** Tramo de cinta que el Lanyard repite a lo largo: la X y el logotipo sobre azul de marca. */
export function renderStrap() {
  const { canvas, ctx } = newCanvas(720, 128);
  ctx.fillStyle = BRAND_BLUE;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMark(ctx, 110, 64, 84, { line: WHITE, shards: WHITE });
  drawWordmark(ctx, 430, 64, 40, WHITE, 70);
  return canvas.toDataURL("image/png");
}
