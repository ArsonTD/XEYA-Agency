/*
 * Hay trabajo que solo se hace una vez pero bloquea el navegador unas décimas de segundo:
 * crear un lienzo WebGL, compilar sus sombreadores, dibujar una textura. Si ocurre mientras
 * el visitante hace scroll, se nota como un tirón.
 *
 * `calmMoment()` reparte ese trabajo: da paso de uno en uno, cuando la página lleva un
 * instante sin scroll y el navegador está libre, y deja un respiro entre un paso y el siguiente
 * (también entre componentes distintos) para que las animaciones en pantalla sigan corriendo.
 */

/** Tiempo sin scroll para considerar que la página está quieta (ms) */
const QUIET_MS = 180;
/** Respiro mínimo entre el final de un paso y el comienzo del siguiente (ms) */
const GAP_MS = 220;

let lastScroll = -Infinity;
/** Cuándo terminó el último paso (mientras corre, cuándo empezó) */
let lastStep = -Infinity;
let listening = false;

function watchScroll() {
  if (listening) return;
  listening = true;
  window.addEventListener(
    "scroll",
    () => {
      lastScroll = performance.now();
    },
    { passive: true },
  );
}

function whenIdle(run: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 400 });
  } else {
    // Safari no tiene requestIdleCallback
    window.setTimeout(run, 0);
  }
}

/**
 * Espera un momento tranquilo para hacer un paso pesado.
 *
 * @param hurry Si devuelve `true` (lo que se prepara está por entrar en pantalla), no se
 *   espera a que la página esté quieta: solo se cede un fotograma antes del paso.
 */
export function calmMoment(hurry?: () => boolean): Promise<void> {
  watchScroll();
  return new Promise((resolve) => {
    const grant = () => {
      lastStep = performance.now();
      // El paso corre a continuación y bloquea el navegador: el segundo fotograma que
      // logre pintarse marca que ya terminó, y desde ahí se cuenta el respiro.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          lastStep = performance.now();
        }),
      );
      resolve();
    };
    const check = (idle: boolean) => {
      if (hurry?.()) {
        requestAnimationFrame(grant);
        return;
      }
      const now = performance.now();
      const wait = Math.max(QUIET_MS - (now - lastScroll), GAP_MS - (now - lastStep));
      if (wait > 0) {
        window.setTimeout(() => check(false), Math.min(wait, 80));
      } else if (idle) {
        grant();
      } else {
        // Quieta y con respiro: falta que el navegador esté libre. Se vuelve a comprobar ahí,
        // por si entre tanto volvió el scroll u otro componente recibió su turno.
        whenIdle(() => check(true));
      }
    };
    check(false);
  });
}
