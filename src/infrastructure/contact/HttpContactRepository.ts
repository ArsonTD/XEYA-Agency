import type { Contact } from "@/domain/contact/Contact";
import type { ContactRepository } from "@/domain/contact/ContactRepository";

/** Ruta del servidor del sitio que recibe los formularios (app/api/contact/route.ts) */
export const CONTACT_ENDPOINT = "/api/contact";

/**
 * Adaptador del navegador: entrega el mensaje al servidor del propio sitio, que es
 * quien lo envía por correo. Las credenciales del correo nunca llegan al navegador.
 */
export class HttpContactRepository implements ContactRepository {
  async send(contact: Contact): Promise<void> {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Los casos de uso ya exigieron el consentimiento antes de llegar aquí
      body: JSON.stringify({ ...contact, consent: true }),
    });
    if (!response.ok) throw new Error(`El servidor respondió ${response.status} al enviar el mensaje.`);
  }
}
