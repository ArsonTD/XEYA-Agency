import type { CompanyProfile } from "@/domain/company/CompanyProfile";
import type { CompanyProfileRepository } from "@/domain/company/CompanyProfileRepository";

const profile: CompanyProfile = {
  name: "XEYA",
  descriptor: "Soluciones Digitales",
  tagline: "Innovación que transforma negocios y crea oportunidades.",
  story: {
    today:
      "Hoy somos una startup de innovación tecnológica: transformamos ideas en soluciones digitales que impulsan negocios y generan oportunidades reales para el talento emergente.",
    team: "Fundada por {fundadores}, y más tarde fortalecida con la incorporación de José De la Rosa, la empresa surge como respuesta a esa necesidad compartida de abrir camino a nuevas generaciones en el mundo profesional.",
  },
  team: [
    {
      name: "Anderson Tejeda",
      role: "Co-CEO & CTO",
      photo: "/team/anderson-tejeda.png",
      founder: true,
    },
    {
      name: "Eudys Saviñón",
      role: "Co-CEO & CTO",
      photo: "/team/eudys-garcia.png",
      founder: true,
    },
    {
      name: "José De la Rosa",
      role: "Co-CEO & COO",
      photo: "/team/jose-de-la-rosa.webp",
    },
  ],
  pillars: ["Innovación", "Diseño", "Desarrollo", "Transformación digital", "Talento emergente"],
  services: [
    {
      name: "Aplicaciones web",
      description:
        "Plataformas, sistemas y sitios a medida, con programación integral y optimización SEO.",
    },
    {
      name: "Aplicaciones móviles",
      description: "Apps centradas en el usuario, de la idea al lanzamiento.",
    },
    {
      name: "Aplicaciones de escritorio",
      description: "Software que ordena y acelera la operación de tu negocio.",
    },
    {
      name: "Diseño web",
      description: "Interfaces y experiencias visuales impactantes, claras y eficientes.",
    },
    {
      name: "Diseño gráfico",
      description: "Branding, piezas gráficas y animaciones que impulsan tu identidad de marca.",
    },
  ],
  location: {
    country: "República Dominicana",
    timeZone: "America/Santo_Domingo",
  },
  mission: {
    label: "Nuestra Misión",
    title: "Innovar la transformación digital",
    body: "Desarrollamos software inteligente y diseñamos experiencias visuales impactantes que resuelven problemas reales. Creemos que la tecnología y el diseño deben trabajar juntos para crear soluciones accesibles, eficientes y centradas en el usuario que impulsan el éxito de nuestros clientes.",
  },
  vision: {
    label: "Nuestra Visión",
    title: "Convertirnos en referentes de innovación tecnológica y diseño",
    body: "Aspiramos a ser referentes en Latinoamérica, creando herramientas y diseños que impulsen negocios más eficientes, sostenibles y preparados para el futuro digital. Queremos ser el aliado estratégico de confianza para las empresas que buscan crecer y transformarse a través de la innovación.",
  },
  valuesIntro: {
    label: "Nuestros Valores",
    title: "Principios que nos guían",
    body: "",
  },
  values: [
    {
      name: "Innovación constante",
      description: "Siempre explorando nuevas tecnologías y metodologías.",
    },
    {
      name: "Transparencia",
      description: "Comunicación clara y honesta en cada etapa del proyecto.",
    },
    {
      name: "Desarrollo ágil",
      description: "Entregas rápidas con metodologías colaborativas.",
    },
    {
      name: "Calidad superior",
      description: "Código limpio, testeado y mantenido.",
    },
  ],
  contact: {
    phone: "(849) 575-2829",
    phoneHref: "tel:+18495752829",
    email: "xeyainnovation@gmail.com",
    website: "www.xeya.com.do",
    websiteHref: "https://www.xeya.com.do",
    instagramHandle: "@xeya.srl",
    instagramUrl: "https://www.instagram.com/xeya.srl/",
  },
  // Se publica sin RNC ni domicilio por decisión del negocio (12-11-2026). Para añadirlos
  // basta con completar `taxId` y `address` aquí: las páginas legales y el pie los muestran
  // solos. La Ley 172-13 pide informar la identidad y el domicilio del responsable de los datos.
  legal: {
    legalName: "XEYA SRL",
    country: "República Dominicana",
  },
};

/** Adaptador: perfil de la empresa definido en código. */
export class StaticCompanyProfileRepository implements CompanyProfileRepository {
  get(): CompanyProfile {
    return profile;
  }
}
