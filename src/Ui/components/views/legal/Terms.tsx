import Link from "next/link";
import LegalLayout from "@/Ui/layout/LegalLayout";
import ROUTES from "@/Ui/router";
import { BusinessIdentity, ContactEmail, LEGAL_UPDATED } from "./LegalParts";

/** Título de la página: lo usan esta vista y la pestaña del navegador. */
export const TERMS_TITLE = "Términos y condiciones";

export default function Terms() {
  return (
    <LegalLayout title={TERMS_TITLE} updated={LEGAL_UPDATED}>
      <p>
        Estos términos regulan el uso de este sitio web. Al navegar por él aceptas lo que aquí se
        indica. Si no estás de acuerdo, te pedimos que no lo uses.
      </p>

      <h2>1. Quién está detrás del sitio</h2>
      <BusinessIdentity />

      <h2>2. Para qué sirve este sitio</h2>
      <p>
        El sitio presenta a XEYA, sus servicios y algunos de sus proyectos, y ofrece formas de
        contactarnos. Es informativo: aquí no se venden productos ni se procesan pagos.
      </p>

      <h2>3. Uso permitido</h2>
      <p>Puedes navegar por el sitio y contactarnos libremente. No está permitido:</p>
      <ul>
        <li>usarlo para fines ilícitos o que perjudiquen a XEYA o a terceros;</li>
        <li>intentar acceder a áreas o sistemas no públicos, o alterar su funcionamiento;</li>
        <li>enviar por los formularios contenido falso, ofensivo, publicitario no solicitado o
          malicioso;</li>
        <li>extraer su contenido de forma masiva o automatizada sin nuestra autorización.</li>
      </ul>

      <h2>4. Propiedad intelectual</h2>
      <p>
        La marca XEYA, el diseño del sitio, sus textos, imágenes y código pertenecen a XEYA SRL o se
        usan con licencia. No puedes reproducirlos ni usarlos con fines comerciales sin nuestra
        autorización escrita.
      </p>
      <p>
        Los nombres, marcas y capturas de pantalla de los proyectos del portfolio pertenecen a sus
        respectivos titulares y se muestran solo para ilustrar el trabajo realizado. El sitio usa
        además componentes y tipografías de terceros bajo sus propias licencias de código abierto.
      </p>

      <h2>5. Servicios y contratación</h2>
      <p>
        La información del sitio describe lo que hacemos, pero no constituye una oferta vinculante.
        Cada proyecto se formaliza mediante una propuesta o contrato por escrito, que establece el
        alcance, los plazos, el precio y las condiciones de pago. Si algo de este sitio difiere de
        ese documento, prevalece lo firmado.
      </p>
      <p>
        Las condiciones de cancelación y devolución se explican en la{" "}
        <Link href={ROUTES.REFUNDS}>Política de reembolsos</Link>.
      </p>

      <h2>6. Enlaces a otros sitios</h2>
      <p>
        El sitio enlaza a páginas de terceros, como Instagram o los proyectos del portfolio. XEYA no
        controla su contenido ni sus condiciones y no responde por ellos.
      </p>

      <h2>7. Disponibilidad y responsabilidad</h2>
      <p>
        Procuramos que el sitio esté disponible y que su contenido sea correcto y esté al día, pero
        puede contener errores o dejar de estar accesible temporalmente. En la medida en que la ley
        lo permita, XEYA no responde por los daños derivados del uso del sitio o de la imposibilidad
        de usarlo. Nada de lo anterior limita los derechos que la ley reconoce a los consumidores y
        usuarios.
      </p>

      <h2>8. Privacidad y cookies</h2>
      <p>
        El tratamiento de tus datos se explica en la{" "}
        <Link href={ROUTES.PRIVACY}>Política de privacidad</Link>, y el uso de cookies y tecnologías
        similares, en la <Link href={ROUTES.COOKIES}>Política de cookies</Link>.
      </p>

      <h2>9. Cambios en estos términos</h2>
      <p>
        Podemos actualizar estos términos. La versión vigente es la publicada en esta página, con
        la fecha que aparece al inicio.
      </p>

      <h2>10. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se
        someterá a los tribunales dominicanos competentes, sin perjuicio de las normas que protegen
        a los consumidores.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos, escríbenos a <ContactEmail />.
      </p>
    </LegalLayout>
  );
}
