"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarBorder from "@/Ui/components/core/StarBorder/StarBorder";
import { useLiteDevice } from "@/Ui/hooks/useMediaQuery";
import { scrollToTarget } from "@/Ui/lib/smoothScroll";

const TABS = [
  { id: "portfolio", label: "Portfolio" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Navbar glass flotante, centrada abajo, con una estrella recorriendo su borde. Aparece al terminar la intro del Hero. */
export default function GlassNav({ visible }: { visible: boolean }) {
  const [active, setActive] = useState<TabId | null>(null);
  // Desenfocar lo que hay detrás de una barra fija obliga a recalcularlo en cada fotograma de
  // scroll: en teléfono la barra va casi opaca y sin desenfoque.
  const lite = useLiteDevice();

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        const current = [...TABS].reverse().find((t) => inView.has(t.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2"
        >
          <StarBorder
            as="nav"
            aria-label="Principal"
            color="#ffffff"
            trailColor="#6ba3d0"
            duration={5}
            trailLength={0.35}
            thickness={1}
            radius={999}
            glow={0.6}
            hover="lap"
            clickPulse
            theme="dark"
            backgroundColor={lite ? "rgba(6, 18, 28, 0.92)" : "rgba(6, 18, 28, 0.6)"}
            borderColor="rgba(255, 255, 255, 0.16)"
            style={{
              padding: 6,
              gap: 4,
              backdropFilter: lite ? undefined : "blur(18px) saturate(170%)",
              WebkitBackdropFilter: lite ? undefined : "blur(18px) saturate(170%)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
            }}
          >
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToTarget(tab.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`label relative cursor-pointer rounded-full px-3.5 py-2.5 transition-colors duration-300 sm:px-5 ${
                    isActive ? "text-ink" : "text-white/75 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="glass-nav-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </StarBorder>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
