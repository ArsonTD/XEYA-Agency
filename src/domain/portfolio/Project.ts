/** Dispositivo en el que se muestra una pantalla del proyecto. */
export type ProjectDevice = "laptop" | "phone";

export interface ProjectScreen {
  device: ProjectDevice;
  /** Ruta pública de la captura */
  src: string;
  alt: string;
}

/** Un proyecto del portfolio. */
export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  /** Capturas en orden de protagonismo: la primera de cada dispositivo es la principal */
  screens: ProjectScreen[];
  /** Dirección pública del proyecto en producción, si se puede visitar */
  liveUrl?: string;
}

export const screensFor = (project: Project, device: ProjectDevice): ProjectScreen[] =>
  project.screens.filter((screen) => screen.device === device);

/** Dominio legible de la dirección en producción (sin protocolo ni www). */
export const liveHost = (project: Project): string | null => {
  if (!project.liveUrl) return null;
  try {
    return new URL(project.liveUrl).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};
