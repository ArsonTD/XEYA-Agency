import Link from "next/link";
import LegalLayout from "@/Ui/layout/LegalLayout";
import ROUTES from "@/Ui/router";
import { ContactEmail, LEGAL_UPDATED } from "./LegalParts";

/** Título de la página: lo usan esta vista y la pestaña del navegador. */
export const REFUND_POLICY_TITLE = "Política de reembolsos";

export default function RefundPolicy() {
  return (
    <LegalLayout title={REFUND_POLICY_TITLE} updated={LEGAL_UPDATED}>
      <p>
        Esta política explica cómo se manejan las cancelaciones y devoluciones de dinero en los
        servicios que presta XEYA.
      </p>

      <h2>1. Este sitio no cobra</h2>
      <p>
        En este sitio no se venden productos ni se procesan pagos. Todo pago a XEYA se acuerda y se
        realiza fuera del sitio, como parte de un proyecto contratado.
      </p>

      <h2>2. Servicios a medida</h2>
      <p>
        XEYA desarrolla software y diseño a medida. Cada proyecto se formaliza mediante una
        propuesta o contrato por escrito que indica el alcance, las entregas, el precio y las
        condiciones de pago. Las condiciones de cancelación y reembolso de cada proyecto son las que
        consten en ese documento.
      </p>

      <h2>3. Cómo solicitar una cancelación o un reembolso</h2>
      <p>
        Escríbenos a <ContactEmail /> indicando el proyecto y el motivo. Revisaremos tu solicitud
        conforme a lo pactado en tu propuesta o contrato y te responderemos por el mismo medio.
      </p>

      <h2>4. Productos por suscripción</h2>
      <p>
        Los productos de XEYA que se ofrecen por suscripción o por plan se rigen por las
        condiciones que se te informen al contratarlos, no por esta página.
      </p>

      <h2>5. Tus derechos como consumidor</h2>
      <p>
        Nada de lo indicado aquí limita los derechos que la Ley General de Protección de los
        Derechos del Consumidor o Usuario, núm. 358-05, reconoce a los consumidores y usuarios en la
        República Dominicana. Si no quedas conforme con nuestra respuesta, puedes acudir a Pro
        Consumidor.
      </p>

      <h2>6. Más información</h2>
      <p>
        Las condiciones generales de uso de este sitio están en los{" "}
        <Link href={ROUTES.TERMS}>Términos y condiciones</Link>.
      </p>
    </LegalLayout>
  );
}
