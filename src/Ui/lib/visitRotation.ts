/* Turno ya calculado en esta carga de página (evita avanzar dos veces en un mismo render). */
const turns = new Map<string, number>();

/**
 * Turno de rotación para esta visita: avanza uno cada vez que se carga la página,
 * así ningún elemento ocupa siempre el mismo lugar. La primera visita empieza
 * en un turno al azar; sin almacenamiento disponible, cada carga es al azar.
 */
export function visitTurn(key: string, size: number): number {
  if (size <= 1) return 0;
  const known = turns.get(key);
  if (known !== undefined) return known % size;

  let turn = Math.floor(Math.random() * size);
  try {
    const stored = Number.parseInt(window.localStorage.getItem(key) ?? "", 10);
    if (Number.isFinite(stored)) turn = (stored + 1) % size;
    window.localStorage.setItem(key, String(turn));
  } catch {
    // Sin localStorage (modo privado, bloqueado): se queda el turno al azar.
  }

  turns.set(key, turn);
  return turn;
}

/** La misma lista, empezando `turn` posiciones más adelante. */
export function rotate<T>(list: readonly T[], turn: number): T[] {
  if (list.length === 0) return [];
  const start = ((turn % list.length) + list.length) % list.length;
  return [...list.slice(start), ...list.slice(0, start)];
}
