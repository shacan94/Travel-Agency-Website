export const primaryNav = [
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Umrah", href: "/umrah" },
  { label: "Northern Areas", href: "/northern-areas" },
  { label: "Visa", href: "/visa" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  Explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Umrah", href: "/umrah" },
    { label: "Northern Areas", href: "/northern-areas" },
    { label: "Gallery", href: "/gallery" },
  ],
  Services: [
    { label: "Plan a trip", href: "/inquire" },
    { label: "Visa support", href: "/visa" },
    { label: "Group bookings", href: "/inquire?intent=group" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
