// Centralized route constants for the app
export const ROUTES = {
  HOME: '/',
  SOLUTIONS: '/solutions',
  CONTACT: '/#contact',
  PRIVACY: '/privacidad',
  TERMS: '/terminos',
  COOKIES: '/cookies',
  REFUNDS: '/reembolsos',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Páginas legales, en el orden en que se enlazan desde el pie. */
export const LEGAL_LINKS = [
  { to: ROUTES.PRIVACY, label: 'Privacidad' },
  { to: ROUTES.TERMS, label: 'Términos' },
  { to: ROUTES.COOKIES, label: 'Cookies' },
  { to: ROUTES.REFUNDS, label: 'Reembolsos' },
] as const;

export default ROUTES;
