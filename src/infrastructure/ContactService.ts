import type { Contact } from "@/domain/Contact";

export async function sendContact(contact: Contact): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending contact:", error);
    return false;
  }
}
