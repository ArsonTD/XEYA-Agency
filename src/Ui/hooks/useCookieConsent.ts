import { useSyncExternalStore } from "react";
import { allowsThirdPartyContent } from "@/domain/privacy/CookieConsent";
import { cookieConsent } from "@/infrastructure/container";

/** Decisión del visitante sobre las cookies de terceros, siempre al día. */
export function useCookieConsent() {
  const consent = useSyncExternalStore(cookieConsent.subscribe, cookieConsent.get, () => "unset" as const);

  return {
    consent,
    /** `true` solo si aceptó expresamente */
    allowed: allowsThirdPartyContent(consent),
    accept: cookieConsent.accept,
    reject: cookieConsent.reject,
    reset: cookieConsent.reset,
  };
}
