import type { ProjectScreen } from "@/domain/portfolio/Project";
import { cn } from "@/libs/utils";

interface Props {
  screen: ProjectScreen;
  className?: string;
}

/* Colores del chasis: grafito sobre tinta, con el filo iluminado como el resto de la página. */
const BODY = "bg-[#070d13]";
const METAL = "bg-[#16222d]";

/**
 * Laptop dibujada en CSS. Todas las medidas van en `cqw` (relativas al ancho
 * del propio mockup), así que conserva sus proporciones a cualquier tamaño.
 */
export function LaptopMockup({ screen, className }: Props) {
  return (
    <div className={cn("@container relative", className)}>
      {/* Luz que la pantalla deja sobre la mesa */}
      <span
        aria-hidden="true"
        className="absolute inset-x-[10%] -bottom-[2.5cqw] h-[7cqw] rounded-[50%] bg-beam opacity-60 blur-[5cqw]"
      />

      {/* Tapa */}
      <div
        className={cn(
          "relative mx-auto w-[86%] rounded-t-[2.2cqw] border border-b-0 border-[rgba(191,234,255,0.22)] p-[1.5cqw] pb-[1.9cqw]",
          BODY,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute top-[0.5cqw] left-1/2 h-[0.5cqw] w-[0.5cqw] -translate-x-1/2 rounded-full bg-white/20"
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5cqw] bg-black">
          <img
            src={screen.src}
            alt={screen.alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Base */}
      <div
        className={cn(
          "relative h-[2.2cqw] rounded-t-[0.3cqw] rounded-b-[1.8cqw] border-t border-[rgba(191,234,255,0.4)]",
          METAL,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0 left-1/2 h-[40%] w-[14%] -translate-x-1/2 rounded-b-[0.8cqw]",
            BODY,
          )}
        />
      </div>
    </div>
  );
}

/** Teléfono dibujado en CSS, con las mismas reglas que la laptop. */
export function PhoneMockup({ screen, className }: Props) {
  return (
    <div className={cn("@container relative", className)}>
      <div
        className={cn(
          "relative rounded-[14cqw] border border-[rgba(191,234,255,0.28)] p-[3.2cqw] shadow-[0_24px_60px_-22px_rgba(31,127,214,0.85)]",
          BODY,
        )}
      >
        {/* Botones laterales */}
        <span
          aria-hidden="true"
          className={cn("absolute top-[19%] -left-[1.4cqw] h-[4.5%] w-[1.4cqw] rounded-l-[1cqw]", METAL)}
        />
        <span
          aria-hidden="true"
          className={cn("absolute top-[26%] -left-[1.4cqw] h-[7.5%] w-[1.4cqw] rounded-l-[1cqw]", METAL)}
        />
        <span
          aria-hidden="true"
          className={cn("absolute top-[23%] -right-[1.4cqw] h-[10%] w-[1.4cqw] rounded-r-[1cqw]", METAL)}
        />

        <div className="relative aspect-[6/13] overflow-hidden rounded-[11cqw] bg-black">
          <img
            src={screen.src}
            alt={screen.alt}
            width={600}
            height={1300}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
