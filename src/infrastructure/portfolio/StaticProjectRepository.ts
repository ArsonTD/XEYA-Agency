import type { Project } from "@/domain/portfolio/Project";
import type { ProjectRepository } from "@/domain/portfolio/ProjectRepository";

/** Capturas en /public/projects/<slug>/ (16:10 para laptop, 6:13 para móvil). */
const shot = (slug: string, file: string) => `/projects/${slug}/${file}.webp`;

const PROJECTS: Project[] = [
  {
    slug: "elevate",
    name: "Elevate",
    description:
      "Sitio de Elevate Management Firm, una red de empresas especializadas en Knoxville, Tennessee. Reúne iluminación, logística, construcción, acabados, audio y video, y pintura en un directorio que se filtra por especialidad.",
    tags: ["Sitio web", "Corporativo", "Knoxville, TN"],
    liveUrl: "https://www.elevatemanagementfirm.com/companies",
    screens: [
      {
        device: "laptop",
        src: shot("elevate", "companies"),
        alt: "Directorio de empresas de Elevate en escritorio",
      },
      {
        device: "phone",
        src: shot("elevate", "companies-movil"),
        alt: "Directorio de empresas de Elevate en móvil",
      },
    ],
  },
  {
    slug: "mandalo",
    name: "Mandalo",
    description:
      "Control de pedidos y punto de venta para colmados. Desde el celular se reciben los pedidos, se cobra en el mostrador, se lleva el cartón de fiao y el inventario, y se coordina el delivery.",
    tags: ["Aplicación web", "Pedidos y POS", "Colmados"],
    liveUrl: "https://mandalo.xeya.com.do/",
    screens: [
      { device: "phone", src: shot("mandalo", "pedidos"), alt: "Pedidos del día en Mandalo" },
      { device: "phone", src: shot("mandalo", "caja"), alt: "Caja de mostrador en Mandalo" },
      { device: "phone", src: shot("mandalo", "inventario"), alt: "Control de inventario en Mandalo" },
    ],
  },
  {
    slug: "xeya-pos",
    name: "XEYA POS",
    description:
      "Punto de venta en la nube para vender, controlar el inventario y entender el negocio desde un solo lugar. Suma compras, reportes, comprobantes fiscales electrónicos y un modo restaurante con mesas y pantalla de cocina.",
    tags: ["SaaS", "Punto de venta", "Inventario"],
    liveUrl: "https://pos.xeya.com.do/",
    screens: [
      { device: "laptop", src: shot("xeya-pos", "caja"), alt: "Pantalla de caja de XEYA POS" },
    ],
  },
  {
    slug: "mordia",
    name: "Mordia",
    description:
      "Para negocios de comida: un bot de WhatsApp toma los pedidos y el equipo los despacha desde el celular. Incluye el menú, el control de ingredientes, la venta en el local, el cierre de jornada y los reportes.",
    tags: ["Aplicación web", "Restaurantes", "Pedidos por WhatsApp"],
    liveUrl: "https://mordia.xeya.com.do/",
    screens: [
      { device: "phone", src: shot("mordia", "menu"), alt: "Menú de platos en Mordia" },
      { device: "phone", src: shot("mordia", "ingredientes"), alt: "Control de ingredientes en Mordia" },
      { device: "phone", src: shot("mordia", "venta-local"), alt: "Venta en el local en Mordia" },
    ],
  },
  {
    slug: "xecf",
    name: "XeCF",
    description:
      "Facturación electrónica lista para la DGII. Emite, firma y da seguimiento a los comprobantes fiscales electrónicos desde un solo lugar, con secuencias e-NCF, borradores y comprobantes recibidos.",
    tags: ["SaaS", "Factura electrónica", "DGII"],
    liveUrl: "https://xecf.xeya.com.do/",
    screens: [
      { device: "laptop", src: shot("xecf", "landing"), alt: "Página de inicio de XeCF" },
    ],
  },
  {
    slug: "repieza",
    name: "Repieza",
    description:
      "Catálogo en línea para tiendas de repuestos de autos y motos. El cliente busca la pieza, arma su presupuesto y lo envía por WhatsApp; detrás, un panel con inventario, modelos de vehículos, clientes, ventas y caja.",
    tags: ["Catálogo en línea", "Presupuestos por WhatsApp", "Panel y caja"],
    liveUrl: "https://repieza.xeya.com.do/",
    screens: [
      {
        device: "laptop",
        src: shot("repieza", "landing"),
        alt: "Página de Repieza en escritorio",
      },
      {
        device: "phone",
        src: shot("repieza", "landing-movil"),
        alt: "Página de Repieza en móvil",
      },
    ],
  },
  {
    slug: "xeya-digital-store",
    name: "XEYA Digital Store",
    description:
      "Tienda en línea que se adapta a la marca de cada negocio: portada, catálogo y fichas de producto, con pedidos por WhatsApp. Incluye un panel para gestionar pedidos, productos, inventario y clientes.",
    tags: ["Tienda en línea", "E-commerce", "Panel de administración"],
    liveUrl: "https://store.xeya.com.do/",
    screens: [
      {
        device: "laptop",
        src: shot("xeya-digital-store", "portada"),
        alt: "Portada de una tienda hecha con XEYA Digital Store",
      },
      {
        device: "phone",
        src: shot("xeya-digital-store", "portada-movil"),
        alt: "La misma tienda en móvil",
      },
    ],
  },
];

/** Adaptador: lista curada de proyectos. */
export class StaticProjectRepository implements ProjectRepository {
  list(): Project[] {
    return PROJECTS;
  }
}
