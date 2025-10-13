"use client";

import Button from "@/Ui/components/Button";

import { ArrowUpRight } from "lucide-react";
import AnimatedBackground from "@/Ui/components/AnimatedBackground";
import ClientCarousel from "@/Ui/components/ClientCarousel";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onOpenModal: () => void;
}


export default function Hero({ onOpenModal }: HeroProps) {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      <AnimatedBackground />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <nav className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-6 border border-white/10 rounded-xl bg-black/50 backdrop-blur-sm px-6 py-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:text-gray-300 cursor-pointer" 
            >
              Solutions <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:text-gray-300 cursor-pointer"
            >
              Innovation <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About Us <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="rounded-full bg-transparent border-white/20 text-white hover:bg-white/5 absolute right-6 md:right-48 "
            onClick={onOpenModal}
          >
            Contact
          </Button>
        </div>
      </nav>


      <div className="relative z-10 flex-1 flex items-center justify-center">
        <h1 className="text-7xl md:text-9xl font-bold text-white">XEYA</h1>
      </div>

      <div className="relative z-10 pb-8 ">
        <ClientCarousel />
      </div>
    </section>
  );
}
