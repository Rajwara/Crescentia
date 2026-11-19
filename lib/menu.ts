import type { ImageName } from "./images";
import { products } from "./products";

/**
 * The full menu, grouped into sections shown on /menu.
 * ⚠️ Sample dishes and prices — replace with your real menu.
 *
 * `id` is what the cart stores. Items that are also signature products use the product slug as id
 * and link to their product page via `product`.
 */
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // AED
  tags?: ("V" | "VG" | "GF" | "N" | "New" | "Signature")[];
  image?: ImageName;
  product?: string; // slug of /menu/[slug] page
};

export type MenuSection = {
  id: string;
  title: string;
  hours: string;
  intro: string;
  image: ImageName;
  items: MenuItem[];
};

const fromProduct = (slug: string, description?: string, tags: MenuItem["tags"] = ["Signature"]): MenuItem => {
  const p = products.find((x) => x.slug === slug)!;
  return {
    id: p.slug,
    name: p.name,
    description: description ?? p.intro.split(". ")[0] + ".",
    price: Number(p.price.replace(/[^\d.]/g, "")),
    tags,
    image: p.image,
    product: p.slug,
  };
};

export const menu: MenuSection[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    hours: "8 AM – 11 AM",
    intro: "Warm from the morning bake — flaky viennoiserie, slow eggs and honest coffee companions.",
    image: "twice-baked-almond-croissant",
    items: [
      fromProduct("twice-baked-almond-croissant", "Filled with almond cream, baked twice and topped with toasted almonds.", ["Signature", "N"]),
      { id: "butter-croissant", name: "Butter Croissant", description: "Hand-laminated with cultured French butter, 27 crisp layers.", price: 12, tags: ["V"] },
      fromProduct("miso-butter-scone", "Savoury-sweet miso butter, dried cranberries, clotted cream on the side.", ["Signature", "V"]),
      { id: "shakshuka", name: "Shakshuka & Sourdough", description: "Free-range eggs baked in spiced tomato and pepper, with a thick slice of toasted sourdough.", price: 42, tags: ["V"] },
      { id: "labneh-toast", name: "Labneh & Za’atar Toast", description: "Whipped labneh, za’atar, cucumber, olives and olive oil on sourdough.", price: 34, tags: ["V"] },
      { id: "date-oats", name: "Overnight Oats with Dates", description: "Oats soaked in oat milk, Medjool dates, tahini and toasted pistachio.", price: 28, tags: ["VG", "N"] },
    ],
  },
  {
    id: "brunch",
    title: "Brunch",
    hours: "10 AM – 3 PM",
    intro: "Long, slow and a little indulgent — our brioche and sourdough at their most generous.",
    image: "sea-salt-caramel-brioche",
    items: [
      { id: "caramel-french-toast", name: "Caramel Brioche French Toast", description: "Our sea salt caramel brioche, custard-soaked and griddled, with vanilla mascarpone and berries.", price: 46, tags: ["Signature", "V"], image: "sea-salt-caramel-brioche" },
      { id: "avocado-feta", name: "Avocado & Feta Sourdough", description: "Smashed avocado, whipped feta, chilli, lime and a soft-poached egg.", price: 44, tags: ["V"] },
      { id: "salmon-benedict", name: "Smoked Salmon Benedict", description: "Toasted brioche, smoked salmon, poached eggs and lemon hollandaise.", price: 54 },
      { id: "croque-madame", name: "Croque Madame", description: "Sourdough, smoked turkey, béchamel and gruyère, topped with a fried egg.", price: 48 },
      { id: "mezze-board", name: "Brunch Mezze Board (for two)", description: "Hummus, labneh, halloumi, eggs, olives, fresh vegetables and a basket of our breads.", price: 95, tags: ["V", "New"] },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    hours: "12 PM – 4 PM",
    intro: "Sandwiches built on our breads, bright salads and soups made fresh every day.",
    image: "heritage-sourdough",
    items: [
      { id: "chicken-pesto", name: "Roast Chicken & Pesto Sandwich", description: "Herb-roasted chicken, basil pesto, rocket and sun-dried tomato on Heritage Sourdough.", price: 48, image: "heritage-sourdough" },
      { id: "halloumi-focaccia", name: "Halloumi Focaccia", description: "Grilled halloumi, roasted peppers, aubergine and harissa mayo on rosemary focaccia.", price: 44, tags: ["V"] },
      { id: "tomato-soup", name: "Roasted Tomato Soup", description: "Slow-roasted tomato and red pepper soup with a buttered sourdough soldier.", price: 36, tags: ["VG"] },
      { id: "quinoa-salad", name: "Quinoa & Pomegranate Salad", description: "Quinoa, herbs, pomegranate, roasted squash, toasted seeds and sumac dressing.", price: 42, tags: ["VG", "GF"] },
      { id: "burrata", name: "Burrata & Heirloom Tomatoes", description: "Creamy burrata, heirloom tomatoes, basil oil and grilled sourdough.", price: 54, tags: ["V"] },
    ],
  },
  {
    id: "dinner",
    title: "Dinner",
    hours: "From 5 PM",
    intro: "Evenings by the oven — flatbreads, slow-cooked plates and something sweet to finish.",
    image: "order-sourdough-loaf",
    items: [
      fromProduct("heritage-sourdough", "A whole 36-hour loaf to take home, or served warm with cultured butter.", ["Signature", "V"]),
      { id: "bread-service", name: "Sourdough Bread Service", description: "Warm sourdough, cultured butter, olive oil and za’atar for the table.", price: 24, tags: ["V"], image: "order-sourdough-loaf" },
      { id: "flatbread-margherita", name: "Oven-Baked Flatbread Margherita", description: "Slow-proved dough, San Marzano tomato, fior di latte and basil.", price: 52, tags: ["V"] },
      { id: "lamb-shoulder", name: "Slow-Cooked Lamb Shoulder", description: "Seven-hour lamb, freekeh, yoghurt and charred flatbread.", price: 89, tags: ["New"] },
      { id: "mushroom-tartine", name: "Wild Mushroom Tartine", description: "Garlic mushrooms, thyme, aged parmesan and a crispy egg on sourdough.", price: 48, tags: ["V"] },
      { id: "basque-cheesecake", name: "Basque Burnt Cheesecake", description: "Caramelised outside, barely set inside, with seasonal fruit.", price: 38, tags: ["V", "GF"] },
    ],
  },
];

/** Every item that can go in the cart (menu dishes + signature products), by id. */
const catalog = new Map<string, MenuItem>();
for (const p of products) catalog.set(p.slug, fromProduct(p.slug));
for (const s of menu) for (const i of s.items) catalog.set(i.id, i);

export const getItem = (id: string) => catalog.get(id);
export const TAG_LABELS: Record<string, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  N: "Contains nuts",
  New: "New",
  Signature: "Signature",
};
