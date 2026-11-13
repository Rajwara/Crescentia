/**
 * Site-wide settings. Change contact details, address and social links here —
 * every page (header, footer, contact page, legal pages) reads from this file.
 */
export const site = {
  name: "Crescentia",
  tagline: "Modern Baking, Rooted in Craft",
  description:
    "Crescentia is a modern artisan bakery in Dubai — slow-fermented sourdough, viennoiserie and pastries, baked fresh every day.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://crescentia.ae",

  // ⚠️ Replace the placeholders below with your real details.
  email: "hello@crescentia.ae",
  phone: "+971 4 000 0000",
  address: {
    line1: "Shop 00, Jumeirah Beach Road",
    city: "Dubai",
    country: "United Arab Emirates",
  },
  mapUrl: "https://maps.google.com/?q=Dubai",
  hours: [
    { label: "Tuesday – Saturday", value: "8:00 AM – 6:00 PM" },
    { label: "Sunday – Monday", value: "Closed" },
  ],
  deliveryArea: "Within 8km of our Dubai store",

  social: [
    { label: "INSTAGRAM", href: "https://www.instagram.com/" },
    { label: "FACEBOOK", href: "https://www.facebook.com/" },
    { label: "TIKTOK", href: "https://www.tiktok.com/" },
  ],

  footerPages: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footerLegal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.city}, ${site.address.country}`;
export const phoneHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
