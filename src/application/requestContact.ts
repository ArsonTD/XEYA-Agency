import { isValidEmail } from "@/domain/contact/Contact";
import type { ContactRepository } from "@/domain/contact/ContactRepository";
import { CONSENT_REQUIRED, InvalidContactError } from "./sendContact";

/**
 * Caso de uso: alguien deja solo su correo para que XEYA le escriba.
 * Exige el consentimiento expreso de la persona antes de tratar el dato.
 */
export const makeRequestContact =
  (repository: ContactRepository) =>
  async (email: string, consent: boolean): Promise<void> => {
    if (!consent) throw new InvalidContactError(CONSENT_REQUIRED);
    const clean = email.trim();
    if (!isValidEmail(clean)) throw new InvalidContactError("Escribe un correo válido.");
    await repository.send({
      name: "Visitante de la web",
      email: clean,
      message: "Dejó su correo en el formulario rápido de la landing para que XEYA le contacte.",
    });
  };
