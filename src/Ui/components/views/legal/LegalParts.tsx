import { getCompanyProfile } from "@/infrastructure/container";

/** Fecha de la última revisión de los textos legales. Cámbiala al editar cualquiera de ellos. */
export const LEGAL_UPDATED = "12 de noviembre de 2026";

/** Quién responde por el sitio y cómo contactarlo. Muestra el RNC y el domicilio cuando constan. */
export function BusinessIdentity() {
  const { legal, contact } = getCompanyProfile();

  return (
    <ul>
      <li>
        <strong>Razón social:</strong> {legal.legalName}
      </li>
      {legal.taxId && (
        <li>
          <strong>RNC:</strong> {legal.taxId}
        </li>
      )}
      {/* Sin domicilio registrado solo se indica el país, sin llamarlo domicilio */}
      {legal.address ? (
        <li>
          <strong>Domicilio:</strong> {legal.address}, {legal.country}
        </li>
      ) : (
        <li>
          <strong>País:</strong> {legal.country}
        </li>
      )}
      <li>
        <strong>Correo:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      <li>
        <strong>Teléfono:</strong> <a href={contact.phoneHref}>{contact.phone}</a>
      </li>
    </ul>
  );
}

/** Enlace de correo para ejercer derechos o hacer consultas. */
export function ContactEmail() {
  const { contact } = getCompanyProfile();
  return <a href={`mailto:${contact.email}`}>{contact.email}</a>;
}
