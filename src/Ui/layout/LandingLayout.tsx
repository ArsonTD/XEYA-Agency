import { useState } from "react";
import Hero from "@/Ui/views/Hero";
import ContactModal from "@/Ui/views/ContactModal";

export default function LandingLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
