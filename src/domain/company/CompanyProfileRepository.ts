import type { CompanyProfile } from "./CompanyProfile";

/** Puerto de salida: origen del perfil de la empresa (estático, CMS, API…). */
export interface CompanyProfileRepository {
  get(): CompanyProfile;
}
