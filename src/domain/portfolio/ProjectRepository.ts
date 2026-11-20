import type { Project } from "./Project";

/** Puerto de salida: origen de los proyectos (lista curada hoy, CMS mañana). */
export interface ProjectRepository {
  list(): Project[];
}
