export interface Principle {
  /** Etiqueta corta: "Nuestra Misión" */
  label: string;
  /** Titular del principio */
  title: string;
  /** Texto completo */
  body: string;
}

export interface CompanyValue {
  name: string;
  description: string;
}

/** La historia de la empresa, por partes */
export interface CompanyStory {
  /** Qué es la empresa hoy */
  today: string;
  /** Quiénes la fundaron y la forman. `{fundadores}` se sustituye por sus nombres. */
  team: string;
}

export interface TeamMember {
  name: string;
  /** Cargo en la empresa */
  role: string;
  /** Ruta pública de su foto */
  photo: string;
  /** Fundó la empresa */
  founder?: boolean;
}

/** Marca del texto de la historia donde van los nombres de quienes fundaron la empresa */
export const FOUNDERS_SLOT = "{fundadores}";

export interface Service {
  name: string;
  description: string;
}

export interface CompanyLocation {
  country: string;
  /** Zona horaria IANA, para mostrar la hora local */
  timeZone: string;
}

export interface ContactChannels {
  phone: string;
  phoneHref: string;
  email: string;
  website: string;
  websiteHref: string;
  instagramHandle: string;
  instagramUrl: string;
}

/** Identificación legal del negocio, para las páginas legales y el pie. */
export interface LegalIdentity {
  /** Razón social */
  legalName: string;
  country: string;
  /** Registro Nacional de Contribuyentes (RNC) */
  taxId?: string;
  /** Domicilio social */
  address?: string;
}

export interface CompanyProfile {
  name: string;
  descriptor: string;
  tagline: string;
  story: CompanyStory;
  team: TeamMember[];
  /** Palabras clave de la marca */
  pillars: string[];
  services: Service[];
  location: CompanyLocation;
  mission: Principle;
  vision: Principle;
  valuesIntro: Principle;
  values: CompanyValue[];
  contact: ContactChannels;
  legal: LegalIdentity;
}
