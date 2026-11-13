import type { ImageName } from "./images";

export type Product = {
  slug: string;
  name: string;
  image: ImageName;
  price: string;
  intro: string;
  category: string;
  weight: string;
  flavour: string;
  allergens: string;
  rating: string;
  purchases: string;
  insideIntro: string;
  nutrition: [string, string][];
  outro: string;
};

const nutrition: [string, string][] = [
  ["Calories", "330–360 Kcal"],
  ["Carbohydrates", "32–35 g"],
  ["Dietary Fiber", "1–2 g"],
  ["Sugars", "5–7 g"],
  ["Protein", "6–7 g"],
  ["Fat", "20–22 g"],
];

export const products: Product[] = [
  {
    slug: "twice-baked-almond-croissant",
    name: "Twice-Baked Almond Croissant",
    image: "twice-baked-almond-croissant",
    price: "AED 18",
    intro:
      "A classic with a rich second life. Our Twice-Baked Almond Croissant starts as a buttery, flaky croissant that’s baked once, then filled with luscious almond cream, brushed with syrup, and baked again to golden perfection. Topped with toasted sliced almonds and a dusting of powdered sugar.",
    category: "Viennoiserie",
    weight: "80 Grams",
    flavour: "Almond Topping",
    allergens: "Gluten, Dairy and Nuts",
    rating: "4.9 / 5.0",
    purchases: "562 Purchases",
    insideIntro:
      "We make our Twice-Baked Almond Croissant with carefully selected ingredients. Here’s an approximate nutritional breakdown per 80 g.",
    nutrition,
    outro:
      "A classic croissant reborn with rich almond cream, lightly soaked in syrup, then baked again until golden and crisp. Perfect for slow mornings, afternoon cravings, or whenever you need something a little extra.",
  },
  {
    slug: "sea-salt-caramel-brioche",
    name: "Sea Salt Caramel Brioche",
    image: "sea-salt-caramel-brioche",
    price: "AED 24",
    intro:
      "A pillowy, butter-rich brioche loaf glazed with house-made salted caramel and finished with flakes of sea salt. Soft, glossy and just sweet enough.",
    category: "Enriched Bread",
    weight: "350 Grams",
    flavour: "Salted Caramel",
    allergens: "Gluten, Dairy and Eggs",
    rating: "4.8 / 5.0",
    purchases: "418 Purchases",
    insideIntro:
      "Made with cultured butter, free-range eggs and slow-cooked caramel. Here’s an approximate nutritional breakdown per 80 g.",
    nutrition,
    outro:
      "Tear it, toast it, or slice it thick for French toast — it’s at its best on the day it’s baked.",
  },
  {
    slug: "miso-butter-scone",
    name: "Miso Butter Scone",
    image: "miso-butter-scone",
    price: "AED 16",
    intro:
      "Our signature scone folds white miso into cold butter for a savoury-sweet, deeply golden bake with a tender, flaky crumb and tart dried cranberries.",
    category: "Scones",
    weight: "110 Grams",
    flavour: "Miso & Cranberry",
    allergens: "Gluten, Dairy and Soy",
    rating: "4.9 / 5.0",
    purchases: "389 Purchases",
    insideIntro:
      "Laminated by hand and baked in small batches. Here’s an approximate nutritional breakdown per 80 g.",
    nutrition,
    outro: "Best enjoyed warm with a pat of salted butter and a strong coffee.",
  },
  {
    slug: "heritage-sourdough",
    name: "Heritage Sourdough",
    image: "heritage-sourdough",
    price: "AED 32",
    intro:
      "A naturally leavened country loaf, fermented for 36 hours with heritage wheat for a blistered, crackling crust and an open, tangy crumb.",
    category: "Sourdough",
    weight: "800 Grams",
    flavour: "Classic Country",
    allergens: "Gluten",
    rating: "5.0 / 5.0",
    purchases: "742 Purchases",
    insideIntro:
      "Just flour, water, salt and our long-lived starter. Here’s an approximate nutritional breakdown per 80 g.",
    nutrition: [
      ["Calories", "190–210 Kcal"],
      ["Carbohydrates", "38–41 g"],
      ["Dietary Fiber", "2–3 g"],
      ["Sugars", "0–1 g"],
      ["Protein", "7–8 g"],
      ["Fat", "1–2 g"],
    ],
    outro: "Keeps beautifully for three days wrapped in linen — and makes the best toast in Dubai.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
