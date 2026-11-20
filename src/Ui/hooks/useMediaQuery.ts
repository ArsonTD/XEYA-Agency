import { useCallback, useSyncExternalStore } from "react";

/** `true` mientras la ventana cumple la media query (p. ej. "(min-width: 1024px)"). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * `true` si el visitante pidió reducir el movimiento. A diferencia de `useReducedMotion`
 * de framer-motion, en el HTML generado y al hidratar vale `false`, así que se puede usar
 * para decidir qué se pinta sin que el navegador y el HTML discrepen.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * `true` en teléfonos y tabletas (pantalla táctil, sin cursor). Ahí los efectos se sirven en
 * su versión ligera: menos resolución, sin desenfoques de fondo y sin escenas 3D, que es lo
 * que traba a un teléfono. En el HTML generado y al hidratar vale `false`.
 */
export function useLiteDevice(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}
