import { brand } from "./brand";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "home" }
  | { kind: "package"; title: string; slug: string }
  | { kind: "destination"; name: string; slug: string }
  | { kind: "umrah"; title?: string; slug?: string }
  | { kind: "northern-areas" }
  | { kind: "visa"; country: string; slug: string }
  | { kind: "inquiry-confirmation"; referenceId?: string };

/**
 * Compose the pre-fill message. No PII ever enters the URL — only page
 * context the agent uses to greet the lead with relevant first reply.
 */
function composeMessage(context: WhatsAppContext): string {
  switch (context.kind) {
    case "package":
      return `Hi ${brand.name}, I'd like more details on the ${context.title} package.`;
    case "destination":
      return `Hi ${brand.name}, I'm planning a trip to ${context.name} — could you help?`;
    case "umrah":
      return context.title
        ? `Hi ${brand.name}, I'm interested in the ${context.title} Umrah group.`
        : `Hi ${brand.name}, I'd like to learn about your Umrah packages.`;
    case "northern-areas":
      return `Hi ${brand.name}, I'm planning a Northern Areas trip — could you help?`;
    case "visa":
      return `Hi ${brand.name}, I'd like help with my ${context.country} visa application.`;
    case "inquiry-confirmation":
      return context.referenceId
        ? `Hi ${brand.name}, I just submitted an inquiry (ref ${context.referenceId}).`
        : `Hi ${brand.name}, I just submitted an inquiry on your website.`;
    case "home":
    case "general":
    default:
      return `Hi ${brand.name}, I'd like to plan a trip.`;
  }
}

export function buildWhatsAppLink(context: WhatsAppContext = { kind: "general" }): string {
  const text = encodeURIComponent(composeMessage(context));
  return `https://wa.me/${brand.contact.whatsappE164}?text=${text}`;
}
