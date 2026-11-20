/**
 * Raíz de composición del servidor: lo que solo puede correr en Node (correo saliente).
 * La usan las rutas de `app/api`; los componentes siguen importando de `container.ts`.
 */
import { makeSendContact } from "@/application/sendContact";
import { SmtpContactRepository, smtpSettingsFromEnv } from "./contact/SmtpContactRepository";

/** Valida un mensaje recibido de un formulario y lo envía por correo. */
export const deliverContact = makeSendContact(
  // La configuración se lee al enviar, no al arrancar: así el sitio se compila sin ella
  { send: (contact) => new SmtpContactRepository(smtpSettingsFromEnv()).send(contact) },
);
