"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import CookieBanner from "@/Ui/components/CookieBanner";
import GlassNav from "@/Ui/components/GlassNav";
import Marquee from "@/Ui/components/Marquee";
import Hero from "@/Ui/components/views/Hero";
import About from "@/Ui/components/views/About";
import Portfolio from "@/Ui/components/views/Portfolio";
import Services from "@/Ui/components/views/Services";
import Principles from "@/Ui/components/views/Principles";
import InstagramFeed from "@/Ui/components/views/InstagramFeed";
import ContactSection from "@/Ui/components/views/ContactSection";
import ContactModal from "@/Ui/components/views/ContactModal";
import Footer from "@/Ui/components/views/Footer";
import { startSmoothScroll } from "@/Ui/lib/smoothScroll";
import { getCompanyProfile } from "@/infrastructure/container";

export default function LandingLayout() {
  const { pillars } = getCompanyProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const finishIntro = useCallback(() => setIntroDone(true), []);

  useEffect(() => startSmoothScroll(), []);

  // Respaldo: si la animación no llega a completarse, la navbar aparece igual.
  useEffect(() => {
    const id = window.setTimeout(finishIntro, 4000);
    return () => window.clearTimeout(id);
  }, [finishIntro]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <main id="contenido" className="bg-ink text-white">
        <Hero onIntroComplete={finishIntro} />
        <Principles />
        <Marquee items={pillars} />
        {/* Terminada la intro, las secciones con WebGL se preparan en segundo plano */}
        <About warm={introDone} />
        <Portfolio />
        <Services warm={introDone} />
        <InstagramFeed />
        <ContactSection onOpenModal={() => setIsModalOpen(true)}>
          <Footer />
        </ContactSection>
      </main>
      <GlassNav visible={introDone} />
      <CookieBanner />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </MotionConfig>
  );
}
