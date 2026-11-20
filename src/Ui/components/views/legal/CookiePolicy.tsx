import Link from "next/link";
import LegalLayout from "@/Ui/layout/LegalLayout";
import ROUTES from "@/Ui/router";
import { BROWSER_STORAGE } from "@/domain/privacy/BrowserStorage";
import CookiePreferences from "./CookiePreferences";
import { ContactEmail, LEGAL_UPDATED } from "./LegalParts";

/** Título de la página: lo usan esta vista y la pestaña del navegador. */
export const COOKIE_POLICY_TITLE = "Política de cookies";

export default function CookiePolicy() {
  return (
    <LegalLayout title={COOKIE_POLICY_TITLE} updated={LEGAL_UPDATED}>
      <p>
        Las cookies son pequeños archivos que un sitio guarda en tu navegador. Existen tecnologías
        parecidas, como el almacenamiento local, que cumplen la misma función. Aquí explicamos
        cuáles usa este sitio y cómo puedes decidir sobre ellas.
      </p>

      <h2>1. Qué usa este sitio</h2>
      <p>
        Este sitio no crea cookies propias, ni de analítica ni de publicidad. Solo guarda dos
        valores técnicos en el almacenamiento local de tu navegador. Ninguno contiene datos
        personales ni se envía a nuestros servidores:
      </p>
      <ul>
        <li>
          <code>{BROWSER_STORAGE.teamTurn}</code>: un número que hace rotar el orden en que aparecen las
          credenciales del equipo en cada visita.
        </li>
        <li>
          <code>{BROWSER_STORAGE.cookieConsent}</code>: tu elección sobre el contenido de Instagram, para no
          volver a preguntarte.
        </li>
      </ul>
      <p>Ambos permanecen hasta que borres los datos de navegación de este sitio.</p>

      <h2>2. Contenido de terceros</h2>
      <ul>
        <li>
          <strong>Instagram (Meta):</strong> la sección de Instagram puede mostrar nuestras
          publicaciones incrustadas. Al cargarlas, Meta recibe tu dirección IP y puede instalar sus
          propias cookies, sobre las que XEYA no tiene control. Por eso solo se cargan si lo
          aceptas. Si no aceptas, verás las tarjetas con un enlace a cada publicación.
        </li>
        <li>
          <strong>Google Fonts:</strong> las tipografías se descargan desde servidores de Google,
          que reciben tu dirección IP. No instala cookies.
        </li>
        <li>
          <strong>Brevo:</strong> solo interviene si envías un formulario, para hacernos llegar tu
          mensaje por correo. No instala cookies.
        </li>
      </ul>

      <h2>3. Tu elección</h2>
      <p>
        Te pedimos permiso antes de cargar contenido de terceros que pueda instalar cookies. Puedes
        cambiar de opinión cuando quieras desde aquí o desde «Preferencias de cookies», al final de
        la página de inicio.
      </p>
      <CookiePreferences />

      <h2>4. Cómo borrarlas desde tu navegador</h2>
      <p>
        También puedes borrar o bloquear las cookies y el almacenamiento local desde la
        configuración de tu navegador. Si lo haces, el sitio seguirá funcionando y volverá a
        preguntarte por tu elección.
      </p>

      <h2>5. Más información</h2>
      <p>
        El tratamiento de tus datos se explica en la{" "}
        <Link href={ROUTES.PRIVACY}>Política de privacidad</Link>. Si tienes dudas, escríbenos a{" "}
        <ContactEmail />.
      </p>
    </LegalLayout>
  );
}
