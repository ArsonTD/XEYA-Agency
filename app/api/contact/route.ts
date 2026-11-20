import { InvalidContactError } from "@/application/sendContact";
import { deliverContact } from "@/infrastructure/server";

/* El envío usa nodemailer: necesita Node, no el runtime "edge". */
export const runtime = "nodejs";

/** Envíos permitidos por visitante en cada ventana de tiempo */
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const recent = new Map<string, number[]>();

/** Freno sencillo contra envíos en ráfaga desde una misma dirección. */
function tooMany(visitor: string): boolean {
  const now = Date.now();
  const times = (recent.get(visitor) ?? []).filter((time) => now - time < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) {
    recent.set(visitor, times);
    return true;
  }
  times.push(now);
  recent.set(visitor, times);
  // Que el registro no crezca sin límite
  if (recent.size > 5000) recent.clear();
  return false;
}

const text = (value: unknown) => (typeof value === "string" ? value : "");

/** Recibe un formulario de contacto, lo valida y lo envía por correo a XEYA. */
export async function POST(request: Request) {
  // El proxy pone delante la dirección real del visitante
  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocido";
  if (tooMany(visitor)) {
    return Response.json(
      { error: "Demasiados envíos seguidos. Inténtalo de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  try {
    await deliverContact(
      { name: text(body?.name), email: text(body?.email), message: text(body?.message) },
      body?.consent === true,
    );
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof InvalidContactError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error("No se pudo enviar el mensaje de contacto:", error);
    return Response.json({ error: "No se pudo enviar el mensaje." }, { status: 500 });
  }
}
