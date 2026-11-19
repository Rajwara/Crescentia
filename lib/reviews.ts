import type { ImageName } from "./images";

/**
 * Customer reviews — shown in the home page slider and on /reviews.
 * ⚠️ These came with the website template. Replace them with real customer reviews.
 */
export type Review = { quote: string; name: string; position: string; image: ImageName };

export const reviews: Review[] = [
  {
    quote: "“One of the most beautifully branded bakeries in the city.”",
    name: "Dubai Food Edit",
    position: "CUSTOMER",
    image: "testimonial-customer-1",
  },
  {
    quote: "“Perfect texture, perfect balance — it’s not just bread, it’s art.”",
    name: "Eat This Daily",
    position: "CUSTOMER",
    image: "testimonial-customer-2",
  },
  {
    quote: "“The sourdough alone is worth the trip across town.”",
    name: "Indie Table",
    position: "CUSTOMER",
    image: "testimonial-customer-3",
  },
];
