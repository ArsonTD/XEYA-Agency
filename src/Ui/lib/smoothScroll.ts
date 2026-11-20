import Lenis from "lenis";
import "lenis/dist/lenis.css";

/* Scroll suave (Lenis) con una API mínima para el resto de la UI. */

let lenis: Lenis | null = null;

export function startSmoothScroll(): () => void {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.11 });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Desplaza hasta un elemento (por id) o hasta el inicio de la página. */
export function scrollToTarget(target: string | 0) {
  const element = target === 0 ? null : document.getElementById(target);
  if (target !== 0 && !element) return;

  if (lenis) {
    lenis.scrollTo(element ?? 0, { duration: 1.4 });
  } else if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Desplaza hasta una posición vertical concreta de la página, en px. */
export function scrollToPosition(top: number) {
  if (lenis) lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: "smooth" });
}

/** Bloquea el scroll de la página mientras hay un diálogo abierto. */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}
