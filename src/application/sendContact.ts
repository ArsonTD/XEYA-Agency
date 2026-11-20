import { CONTACT_LIMITS, isValidEmail, type Contact } from "@/domain/contact/Contact";
import type { ContactRepository } from "@/domain/contact/ContactRepository";

export class InvalidContactError extends Error {}

export const CONSENT_REQUIRED = "Para enviar, acepta la Política de privacidad.";

/**
 * Caso de uso: validar y enviar un mensaje de contacto.
 * Exige el consentimiento expreso de la persona (Ley 172-13) antes de tratar sus datos.
 */
export const makeSendContact =
  (repository: ContactRepository) =>
  async (contact: Contact, consent: boolean): Promise<void> => {
    if (!consent) throw new InvalidContactError(CONSENT_REQUIRED);
    const clean: Contact = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      message: contact.message.trim(),
    };
    if (!clean.name || !clean.message || !isValidEmail(clean.email)) {
      throw new InvalidContactError("Completa tu nombre, un correo válido y tu mensaje.");
    }
    if (
      clean.name.length > CONTACT_LIMITS.name ||
      clean.email.length > CONTACT_LIMITS.email ||
      clean.message.length > CONTACT_LIMITS.message
    ) {
      throw new InvalidContactError("El mensaje es demasiado largo. Acórtalo e inténtalo de nuevo.");
    }
    await repository.send(clean);
  };
