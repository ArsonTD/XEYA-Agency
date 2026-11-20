export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Longitud máxima de cada campo: lo que cabe en un mensaje de contacto razonable */
export const CONTACT_LIMITS = { name: 120, email: 254, message: 5000 } as const;

export interface Contact {
  name: string
  email: string
  message: string
}
