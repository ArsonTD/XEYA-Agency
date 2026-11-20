import type { CompanyProfileRepository } from "@/domain/company/CompanyProfileRepository";

/** Caso de uso: obtener el perfil de la empresa. */
export const makeGetCompanyProfile = (repository: CompanyProfileRepository) => () =>
  repository.get();
