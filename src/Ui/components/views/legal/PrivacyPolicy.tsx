import Link from "next/link";
import LegalLayout from "@/Ui/layout/LegalLayout";
import ROUTES from "@/Ui/router";
import { BusinessIdentity, ContactEmail, LEGAL_UPDATED } from "./LegalParts";

/** Título de la página: lo usan esta vista y la pestaña del navegador. */
export const PRIVACY_POLICY_TITLE = "Política de privacidad";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title={PRIVACY_POLICY_TITLE} updated={LEGAL_UPDATED}>
      <p>
        En XEYA respetamos tu privacidad. Esta política explica qué datos personales tratamos cuando
        visitas este sitio o nos escribes, para qué los usamos y qué derechos tienes. Se rige por la
        Ley núm. 172-13 sobre Protección de Datos de Carácter Personal de la República Dominicana.
      </p>

      <h2>1. Quién es responsable de tus datos</h2>
      <BusinessIdentity />

      <h2>2. Qué datos tratamos</h2>
      <ul>
        <li>
          <strong>Formulario «Cuéntanos tu idea»:</strong> tu nombre, tu correo electrónico y el
          mensaje que escribas.
        </li>
        <li>
          <strong>Formulario rápido «Déjanos tu correo»:</strong> solo tu correo electrónico.
        </li>
        <li>
          <strong>Si nos contactas por teléfono, correo o Instagram:</strong> los datos que tú nos
          facilites por ese medio.
        </li>
        <li>
          <strong>Datos técnicos:</strong> como en cualquier sitio web, el servidor que lo aloja y
          los servicios de terceros descritos más abajo reciben datos técnicos de tu conexión, como
          la dirección IP y el tipo de navegador. No los usamos para identificarte.
        </li>
      </ul>
      <p>
        Pedimos solo los datos necesarios para poder responderte. No solicitamos datos sensibles
        (salud, creencias, datos financieros u otros similares) y te pedimos que no los incluyas en
        tus mensajes. Este sitio no usa herramientas de analítica ni de publicidad, y no elaboramos
        perfiles.
      </p>

      <h2>3. Para qué los usamos</h2>
      <p>
        Usamos tus datos únicamente para responder a tu solicitud y dar seguimiento a la
        conversación sobre tu proyecto. No te enviaremos publicidad ni boletines, y no vendemos ni
        cedemos tus datos a terceros para sus propios fines.
      </p>

      <h2>4. Por qué podemos tratarlos</h2>
      <p>
        Tratamos tus datos con tu consentimiento, que nos das al marcar la casilla de aceptación y
        enviar el formulario. Puedes retirarlo en cualquier momento escribiéndonos a{" "}
        <ContactEmail />. Retirarlo no afecta a lo que ya se haya hecho con tu consentimiento.
      </p>

      <h2>5. Quién más interviene</h2>
      <p>Para que el sitio funcione nos apoyamos en estos proveedores:</p>
      <ul>
        <li>
          <strong>Brevo:</strong> es el servicio de envío de correo que transmite el contenido de
          los formularios hasta nuestro buzón.
        </li>
        <li>
          <strong>Google (Gmail):</strong> es el servicio de correo donde recibimos y respondemos
          tus mensajes.
        </li>
        <li>
          <strong>Proveedor de alojamiento web:</strong> sirve las páginas del sitio.
        </li>
        <li>
          <strong>Google Fonts:</strong> al cargar la página, tu navegador descarga las tipografías
          desde servidores de Google, que reciben tu dirección IP. No instala cookies.
        </li>
        <li>
          <strong>Instagram (Meta):</strong> solo si aceptas ver nuestras publicaciones en el sitio.
          Lo explicamos en la <Link href={ROUTES.COOKIES}>Política de cookies</Link>.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores pueden tratar los datos en servidores situados fuera de la
        República Dominicana. Al enviarnos tus datos aceptas esa transferencia, que es necesaria
        para poder recibir y responder tu mensaje.
      </p>

      <h2>6. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos tus mensajes mientras dure la conversación o la relación comercial que surja de
        ella y, después, el tiempo necesario para atender obligaciones legales. Puedes pedirnos que
        los eliminemos antes, como se indica en el punto siguiente.
      </p>

      <h2>7. Tus derechos</h2>
      <p>La Ley 172-13 te reconoce, entre otros, estos derechos sobre tus datos:</p>
      <ul>
        <li>
          <strong>Acceso:</strong> saber qué datos tuyos tenemos.
        </li>
        <li>
          <strong>Rectificación y actualización:</strong> corregirlos si son inexactos o están
          incompletos.
        </li>
        <li>
          <strong>Cancelación o supresión:</strong> que los eliminemos.
        </li>
        <li>
          <strong>Oposición:</strong> que dejemos de tratarlos.
        </li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a <ContactEmail /> desde el correo con el que nos contactaste, o
        indicándolo en tu mensaje. Podemos pedirte que confirmes tu identidad antes de atender la
        solicitud. Responderemos dentro de los plazos que fija la ley: cinco (5) días hábiles para
        las solicitudes de acceso y diez (10) días hábiles para rectificar, actualizar o suprimir
        datos. Si no quedas conforme con nuestra respuesta, puedes acudir a los tribunales mediante
        la acción de hábeas data.
      </p>

      <h2>8. Cómo los protegemos</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para evitar la pérdida, la alteración
        o el acceso no autorizado a tus datos, y limitamos su acceso a las personas de XEYA que los
        necesitan para responderte. Aun así, ningún sistema es completamente seguro.
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        Este sitio se dirige a empresas y a personas adultas. No recogemos conscientemente datos de
        menores de edad; si crees que un menor nos ha enviado sus datos, escríbenos y los
        eliminaremos.
      </p>

      <h2>10. Enlaces a otros sitios</h2>
      <p>
        El sitio enlaza a páginas de terceros, como Instagram o los proyectos de nuestro portfolio.
        Cada una tiene su propia política de privacidad, sobre la que XEYA no tiene control.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Si cambiamos la forma en que tratamos tus datos, actualizaremos esta página y la fecha que
        aparece al inicio.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier duda sobre esta política o sobre tus datos, escríbenos a <ContactEmail />.
      </p>
    </LegalLayout>
  );
}
