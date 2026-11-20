import { useState } from "react";
import { BROWSER_STORAGE } from "@/domain/privacy/BrowserStorage";
import { useHydrated } from "@/Ui/hooks/useHydrated";
import { visitTurn } from "@/Ui/lib/visitRotation";

/**
 * Turno de rotación del equipo en esta visita: avanza uno en cada carga de la página, para
 * que nadie ocupe siempre el primer lugar. Lo comparten las credenciales y el texto del equipo.
 *
 * El turno se guarda en el navegador: en el HTML generado y mientras React lo hidrata vale 0
 * (el orden original), y pasa al turno real justo después.
 */
export function useTeamTurn(size: number): number {
  const hydrated = useHydrated();
  const [turn] = useState(() =>
    typeof window === "undefined" ? 0 : visitTurn(BROWSER_STORAGE.teamTurn, size),
  );
  return hydrated ? turn : 0;
}
