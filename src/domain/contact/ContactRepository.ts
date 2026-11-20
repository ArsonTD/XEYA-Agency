import type { Contact } from "./Contact";

/** Puerto de salida: cualquier canal capaz de entregar un mensaje de contacto. */
export interface ContactRepository {
  send(contact: Contact): Promise<void>;
}
