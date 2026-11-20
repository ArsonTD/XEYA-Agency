import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` en el HTML que se genera al compilar y mientras React lo hidrata; `true` después.
 * Sirve para lo que solo se sabe en el navegador (almacenamiento, tamaño de pantalla)
 * sin que el primer render difiera del HTML ya enviado.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
