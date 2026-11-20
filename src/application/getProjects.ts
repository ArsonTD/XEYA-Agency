import type { ProjectRepository } from "@/domain/portfolio/ProjectRepository";

/** Caso de uso: proyectos del portfolio, en el orden en que se presentan. */
export const makeGetProjects = (repository: ProjectRepository) => () => repository.list();
