import type { CookieConsentRepository } from "@/domain/privacy/CookieConsent";

/** Casos de uso: consultar, aceptar, rechazar y volver a preguntar por las cookies de terceros. */
export const makeCookieConsent = (repository: CookieConsentRepository) => ({
  get: () => repository.get(),
  accept: () => repository.set("granted"),
  reject: () => repository.set("denied"),
  /** Borra la decisión: el aviso vuelve a mostrarse. */
  reset: () => repository.set("unset"),
  subscribe: (listener: () => void) => repository.subscribe(listener),
});
