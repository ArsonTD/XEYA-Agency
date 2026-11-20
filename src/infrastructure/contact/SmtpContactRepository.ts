import nodemailer from "nodemailer";
import type { Contact } from "@/domain/contact/Contact";
import type { ContactRepository } from "@/domain/contact/ContactRepository";

export interface SmtpSettings {
  host: string;
  port: number;
  user: string;
  pass: string;
  /** Dirección desde la que sale el correo; debe estar verificada en el proveedor */
  from: string;
  /** Buzón de XEYA que recibe los mensajes */
  to: string;
}

/** Lee la configuración del entorno (.env.local en desarrollo, .env en el servidor). */
export function smtpSettingsFromEnv(env: NodeJS.ProcessEnv = process.env): SmtpSettings {
  const need = (name: string) => {
    const value = env[name]?.trim();
    if (!value) throw new Error(`Falta la variable de entorno ${name} para enviar correos.`);
    return value;
  };
  return {
    host: need("SMTP_HOST"),
    port: Number.parseInt(need("SMTP_PORT"), 10),
    user: need("SMTP_USER"),
    pass: need("SMTP_PASS"),
    from: need("CONTACT_FROM"),
    to: need("CONTACT_TO"),
  };
}

/**
 * Adaptador del servidor: envía el mensaje por SMTP. Solo debe importarse desde código
 * que corre en el servidor (la ruta de la API), nunca desde un componente.
 */
export class SmtpContactRepository implements ContactRepository {
  private readonly settings: SmtpSettings;

  constructor(settings: SmtpSettings) {
    this.settings = settings;
  }

  async send(contact: Contact): Promise<void> {
    const { host, port, user, pass, from, to } = this.settings;
    const transport = nodemailer.createTransport({
      host,
      port,
      // El puerto 465 cifra desde el inicio; el 587 empieza en claro y pasa a TLS (STARTTLS)
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user, pass },
    });

    await transport.sendMail({
      from: { name: "Web de XEYA", address: from },
      to,
      // Al responder el correo, la respuesta va a quien escribió
      replyTo: { name: contact.name, address: contact.email },
      subject: `Nuevo mensaje de ${contact.name}`,
      text: [
        `Nombre: ${contact.name}`,
        `Correo: ${contact.email}`,
        "",
        contact.message,
        "",
        "Enviado desde el formulario de xeya.com.do",
      ].join("\n"),
    });
  }
}
