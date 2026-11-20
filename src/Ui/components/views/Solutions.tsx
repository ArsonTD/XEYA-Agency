"use client";

import { useState } from "react";
import Button from "@/Ui/components/Button";
import RouterLink from "@/Ui/router/RouterLink";
import { Code, Palette, Share2, Megaphone, ShoppingCart, Video, Camera, Users, Presentation, ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import AnimatedBackground from "@/Ui/components/AnimatedBackground";
import ContactModal from "@/Ui/components/views/ContactModal";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Solutions() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const solutions = [
    {
      icon: Code,
      title: "Desarrollo de Aplicaciones",
      description:
        "Desarrollo y comercialización de soluciones tecnológicas, incluyendo aplicaciones móviles, web y de escritorio con servicios integrales de programación y optimización SEO.",
    },
    {
      icon: Palette,
      title: "Diseño Gráfico & Branding",
      description:
        "Diseño gráfico, branding, animaciones y demás servicios relacionados con la creación visual para impulsar tu identidad de marca.",
    },
    {
      icon: Share2,
      title: "Gestión de Redes Sociales",
      description:
        "Gestión y manejo de redes sociales para maximizar tu presencia en línea y conectar con tu audiencia de manera efectiva.",
    },
    {
      icon: Megaphone,
      title: "Marketing Digital",
      description:
        "Marketing digital y estrategias de comunicación en línea para aumentar tu visibilidad y alcanzar tus objetivos comerciales.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description:
        "Operación de tiendas y comercios tecnológicos con soluciones completas para tu negocio en línea.",
    },
    {
      icon: Video,
      title: "Producción Audiovisual",
      description:
        "Servicios de videografía y producción audiovisual, incluyendo comerciales, cortometrajes y contenido promocional de alto impacto.",
    },
    {
      icon: Camera,
      title: "Fotografía & Edición",
      description:
        "Edición y fotografía profesional para capturar y perfeccionar cada momento importante de tu marca.",
    },
    {
      icon: Users,
      title: "Asesoría & Consultoría",
      description:
        "Servicios de asesoría y consultoría especializada para guiar tu negocio hacia el éxito digital.",
    },
    {
      icon: Presentation,
      title: "Eventos & Conferencias",
      description:
        "Organización y realización de conferencias y actividades relacionadas con tecnología, comunicación digital y contenidos creativos.",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section with Dark Background */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#171717' }}>
        <AnimatedBackground color="#ffffff" />
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center gap-6 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_2px_4px_rgba(255,255,255,0.1)]" style={{ backdropFilter: 'blur(16px) saturate(180%)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)' }}>
              <RouterLink to="SOLUTIONS">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:text-white/80 cursor-pointer text-white transition-colors"
                >
                  Solutions {pathname === '/solutions' ? <ArrowDown className="h-4 w-4 animate-bounce" /> : <ArrowUpRight className="h-4 w-4" />}
                </Button>
              </RouterLink>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:text-white/80 cursor-pointer text-white transition-colors"
              >
                Innovation {pathname === '/innovation' ? <ArrowDown className="h-4 w-4 animate-bounce" /> : <ArrowUpRight className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:text-white/80 cursor-pointer text-white transition-colors"
              >
                About Us {pathname === '/about' ? <ArrowDown className="h-4 w-4 animate-bounce" /> : <ArrowUpRight className="h-4 w-4" />}
              </Button>
            </div>

            <Button
              variant="outline"
              className="rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] absolute right-4 md:right-48 hover:bg-white/20 transition-colors"
              style={{ backdropFilter: 'blur(16px) saturate(180%)' }}
              onClick={() => setIsModalOpen(true)}
            >
              Contact
            </Button>
          </div>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center pt-48 pb-24 px-6"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white text-center mb-6"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center max-w-3xl text-base md:text-lg leading-relaxed text-gray-400"
          >
            Soluciones tecnológicas integrales que impulsan el crecimiento, la eficiencia y la transformación digital de tu negocio.
          </motion.p>
        </motion.div>
      </div>

      {/* Solutions Grid */}
      <div className="relative bg-white px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] hover:border-blue-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-transparent rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:[transform:perspective(1000px)_rotateY(15deg)_rotateX(10deg)]" style={{ transformStyle: 'preserve-3d' }}>
                  <Icon className="w-7 h-7 text-blue-500 transition-all duration-300 group-hover:drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center py-24 px-6" style={{ backgroundColor: '#171717' }}>
        <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          ¿Listo para Transformar tu Negocio?
        </h3>
        <p className="text-center text-gray-300 text-base md:text-lg mb-10 max-w-2xl">
          Conversemos sobre cómo nuestras soluciones pueden ayudarte a alcanzar tus objetivos.
        </p>
        
        {/* Email Form */}
        <div className="flex flex-col sm:flex-row items-center gap-0 w-full max-w-2xl mb-6 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2">
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-6 py-4 rounded-xl border-0 bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none transition-all"
          />
          <Button className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 justify-center whitespace-nowrap border-2 border-gray-400 group cursor-pointer">
            <span className="relative z-10">Comenzar</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        </Button>
        </div>
        
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
