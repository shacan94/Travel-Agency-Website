/**
 * Brand placeholders — single source of truth.
 * Every reference to brand-specific copy or contact details must flow through
 * this file so they can be swapped in one pass when the agency confirms them.
 */

export const brand = {
  name: "Global Getaways",
  tagline: "Travel More, Worry Less",
  shortName: "Global Getaways",
  legalName: "Global Getaways (Private) Limited",

  contact: {
    email: "[CONTACT_EMAIL]",
    phone: "[CONTACT_PHONE]",
    address: "[CONTACT_ADDRESS]",
    whatsappE164: "923000000000",
    whatsappDisplay: "[WHATSAPP_BUSINESS_NUMBER]",
    inquiryRecipient: "[INQUIRY_RECIPIENT_EMAIL]",
  },

  socials: {
    instagram: "[INSTAGRAM_URL]",
    facebook: "[FACEBOOK_URL]",
    youtube: "[YOUTUBE_URL]",
    tiktok: "[TIKTOK_URL]",
    googleBusiness: "[GOOGLE_BUSINESS_URL]",
  },

  offices: [
    { city: "Karachi", address: "[KARACHI_OFFICE_ADDRESS]", phone: "[KARACHI_OFFICE_PHONE]" },
    { city: "Lahore", address: "[LAHORE_OFFICE_ADDRESS]", phone: "[LAHORE_OFFICE_PHONE]" },
    { city: "Islamabad", address: "[ISLAMABAD_OFFICE_ADDRESS]", phone: "[ISLAMABAD_OFFICE_PHONE]" },
  ],

  hours: {
    weekdays: "Mon–Sat, 10:00 – 19:00 PKT",
    response: "Within a few hours during office hours.",
  },

  /**
   * Phase gate. Phase 1 ships the marketing site + inquiry pipeline.
   * Bump to 2 once the AI quote generator is live; 3 once the visa portal ships.
   * Used to conditionally reveal copy ("Powered by AI", portal CTAs).
   */
  phase: 1 as 1 | 2 | 3,
} as const;

export type Brand = typeof brand;
