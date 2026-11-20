import type { ImageName } from "./images";
import { products } from "./products";

/**
 * The full menu, grouped into the sections shown on /menu.
 * ⚠️ Sample dishes, prices and ingredients — replace with your real menu.
 *
 * PHOTOS: put a photo named after the item's `id` in /public/images/menu/
 * (e.g. /public/images/menu/shakshuka.jpg — .jpg, .jpeg, .png or .webp). It is picked up automatically
 * and replaces the placeholder (or the built-in image) everywhere: menu cards, popup, cart and checkout.
 *
 * `id` is also what the cart stores. Items that are signature products use the product slug as id
 * and link to their product page via `product`.
 */
export type Tag = "V" | "VG" | "GF" | "N" | "New" | "Signature";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // AED
  portion: string;
  ingredients: string[];
  allergens: string;
  specialty: string;
  tags?: Tag[];
  image?: ImageName; // built-in image (used when no photo is uploaded)
  product?: string; // slug of the /menu/[slug] product page
};

export type MenuSection = {
  id: string;
  title: string;
  hours: string;
  intro: string;
  image: ImageName;
  items: MenuItem[];
};

/** A menu item that is one of the four signature products (/menu/[slug]). */
const signature = (
  slug: string,
  extra: Pick<MenuItem, "ingredients" | "specialty"> & Partial<MenuItem>
): MenuItem => {
  const p = products.find((x) => x.slug === slug)!;
  return {
    id: p.slug,
    name: p.name,
    description: p.intro.split(". ").slice(0, 2).join(". ").replace(/\.?$/, "."),
    price: Number(p.price.replace(/[^\d.]/g, "")),
    portion: p.weight.replace("Grams", "g"),
    allergens: p.allergens,
    image: p.image,
    product: p.slug,
    tags: ["Signature"],
    ...extra,
  };
};

const ALMOND_CROISSANT = signature("twice-baked-almond-croissant", {
  ingredients: ["Croissant dough", "Cultured butter", "Almond frangipane", "Vanilla syrup", "Toasted flaked almonds", "Icing sugar"],
  specialty: "Baked twice: once as a croissant, again with almond cream — crisp and caramelised outside, soft in the middle.",
  tags: ["Signature", "N"],
});
const MISO_SCONE = signature("miso-butter-scone", {
  ingredients: ["Flour", "White miso", "Cold cultured butter", "Buttermilk", "Dried cranberries", "Demerara sugar"],
  specialty: "Miso folded into the butter gives a savoury-sweet depth you won’t find in a classic scone.",
  tags: ["Signature", "V"],
});
const BRIOCHE = signature("sea-salt-caramel-brioche", {
  ingredients: ["Flour", "Free-range eggs", "Cultured butter", "House salted caramel", "Sea salt flakes", "Milk", "Sugar"],
  specialty: "Proofed overnight for a pillowy crumb, then glazed with caramel we cook in-house every morning.",
});
const SOURDOUGH = signature("heritage-sourdough", {
  ingredients: ["Heritage wheat flour", "Whole-grain rye", "Water", "Sea salt", "Wild sourdough starter"],
  specialty: "Fermented for 36 hours with our long-lived wild starter — nothing else, no commercial yeast.",
  tags: ["Signature", "VG"],
});

export const menu: MenuSection[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    hours: "8 AM – 11 AM",
    intro: "Warm from the morning bake — flaky viennoiserie, slow eggs and honest coffee companions.",
    image: "twice-baked-almond-croissant",
    items: [
      ALMOND_CROISSANT,
      {
        id: "butter-croissant", name: "Butter Croissant", price: 12, portion: "70 g", tags: ["V"],
        description: "Hand-laminated with cultured French butter for 27 crisp, honeycombed layers.",
        ingredients: ["Flour", "Cultured French butter", "Milk", "Sugar", "Yeast", "Sea salt"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Laminated by hand over three days so every layer stays distinct.",
      },
      MISO_SCONE,
      {
        id: "pain-au-chocolat", name: "Pain au Chocolat", price: 14, portion: "80 g", tags: ["V"],
        description: "Buttery croissant dough wrapped around two batons of dark Belgian chocolate.",
        ingredients: ["Croissant dough", "Cultured butter", "70% dark chocolate batons", "Egg wash"],
        allergens: "Gluten, Dairy, Eggs, Soy",
        specialty: "Two chocolate batons, not one — so every bite has chocolate.",
      },
      {
        id: "shakshuka", name: "Shakshuka & Sourdough", price: 42, portion: "1 skillet", tags: ["V"],
        description: "Free-range eggs baked in spiced tomato and pepper, with toasted Heritage Sourdough.",
        ingredients: ["Free-range eggs", "Tomatoes", "Red peppers", "Onion", "Garlic", "Cumin & paprika", "Feta", "Coriander", "Sourdough"],
        allergens: "Gluten, Eggs, Dairy",
        specialty: "The sauce simmers slowly every morning; eggs are baked to order.",
      },
      {
        id: "labneh-toast", name: "Labneh & Za’atar Toast", price: 34, portion: "2 slices", tags: ["V"],
        description: "Whipped labneh, za’atar, cucumber, olives and olive oil on sourdough.",
        ingredients: ["Sourdough", "Labneh", "Za’atar", "Cucumber", "Kalamata olives", "Mint", "Extra-virgin olive oil"],
        allergens: "Gluten, Dairy, Sesame",
        specialty: "We strain our own labneh overnight for an extra-thick, tangy spread.",
      },
      {
        id: "date-oats", name: "Overnight Oats with Dates", price: 28, portion: "350 g", tags: ["VG", "N"],
        description: "Oats soaked in oat milk with Medjool dates, tahini and toasted pistachio.",
        ingredients: ["Rolled oats", "Oat milk", "Medjool dates", "Tahini", "Chia seeds", "Pistachio", "Cinnamon"],
        allergens: "Gluten (oats), Sesame, Nuts",
        specialty: "Naturally sweetened with dates only — no refined sugar.",
      },
    ],
  },
  {
    id: "brunch",
    title: "Brunch",
    hours: "10 AM – 3 PM",
    intro: "Long, slow and a little indulgent — our brioche and sourdough at their most generous.",
    image: "sea-salt-caramel-brioche",
    items: [
      {
        id: "caramel-french-toast", name: "Caramel Brioche French Toast", price: 46, portion: "3 slices",
        tags: ["Signature", "V"], image: "sea-salt-caramel-brioche",
        description: "Our sea salt caramel brioche, custard-soaked and griddled, with vanilla mascarpone and berries.",
        ingredients: ["Sea Salt Caramel Brioche", "Egg custard", "Vanilla mascarpone", "Seasonal berries", "Salted caramel sauce"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Made with yesterday’s brioche, which soaks up the custard perfectly.",
      },
      BRIOCHE,
      {
        id: "avocado-feta", name: "Avocado & Feta Sourdough", price: 44, portion: "2 slices", tags: ["V"],
        description: "Smashed avocado, whipped feta, chilli, lime and a soft-poached egg.",
        ingredients: ["Sourdough", "Avocado", "Whipped feta", "Poached egg", "Chilli flakes", "Lime", "Pumpkin seeds"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Finished with toasted seeds for crunch and a squeeze of fresh lime.",
      },
      {
        id: "salmon-benedict", name: "Smoked Salmon Benedict", price: 54, portion: "2 eggs",
        description: "Toasted brioche, smoked salmon, poached eggs and lemon hollandaise.",
        ingredients: ["Brioche", "Smoked salmon", "Poached eggs", "Hollandaise", "Lemon", "Dill", "Spinach"],
        allergens: "Gluten, Dairy, Eggs, Fish",
        specialty: "Hollandaise whisked by hand to order, never from a bottle.",
      },
      {
        id: "croque-madame", name: "Croque Madame", price: 48, portion: "1 sandwich",
        description: "Sourdough, smoked turkey, béchamel and gruyère, topped with a fried egg.",
        ingredients: ["Sourdough", "Smoked turkey", "Béchamel", "Gruyère", "Dijon mustard", "Fried egg"],
        allergens: "Gluten, Dairy, Eggs, Mustard",
        specialty: "Grilled then finished under the oven so the gruyère bubbles and browns.",
      },
      {
        id: "mezze-board", name: "Brunch Mezze Board", price: 95, portion: "Serves 2", tags: ["V", "New"],
        description: "Hummus, labneh, halloumi, eggs, olives, fresh vegetables and a basket of our breads.",
        ingredients: ["Hummus", "Labneh", "Grilled halloumi", "Soft-boiled eggs", "Olives", "Cucumber & tomato", "Za’atar", "Bread basket"],
        allergens: "Gluten, Dairy, Eggs, Sesame",
        specialty: "Made for sharing — a little of everything we love, with three kinds of bread.",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    hours: "12 PM – 4 PM",
    intro: "Sandwiches built on our breads, bright salads and soups made fresh every day.",
    image: "heritage-sourdough",
    items: [
      {
        id: "chicken-pesto", name: "Roast Chicken & Pesto Sandwich", price: 48, portion: "1 sandwich", image: "heritage-sourdough",
        description: "Herb-roasted chicken, basil pesto, rocket and sun-dried tomato on Heritage Sourdough.",
        ingredients: ["Heritage Sourdough", "Herb-roasted chicken", "Basil pesto", "Rocket", "Sun-dried tomato", "Parmesan"],
        allergens: "Gluten, Dairy, Nuts",
        specialty: "Chicken roasted in-house each morning; pesto made with fresh basil and pine nuts.",
      },
      {
        id: "halloumi-focaccia", name: "Halloumi Focaccia", price: 44, portion: "1 sandwich", tags: ["V"],
        description: "Grilled halloumi, roasted peppers, aubergine and harissa mayo on rosemary focaccia.",
        ingredients: ["Rosemary focaccia", "Halloumi", "Roasted peppers", "Aubergine", "Harissa mayo", "Rocket"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Our focaccia is proofed for 24 hours and baked with plenty of olive oil.",
      },
      {
        id: "tomato-soup", name: "Roasted Tomato Soup", price: 36, portion: "400 ml", tags: ["VG"],
        description: "Slow-roasted tomato and red pepper soup with a buttered sourdough soldier.",
        ingredients: ["Roasted tomatoes", "Red peppers", "Garlic", "Onion", "Basil", "Olive oil", "Sourdough"],
        allergens: "Gluten (bread)",
        specialty: "Tomatoes are roasted low and slow for two hours to deepen their sweetness.",
      },
      {
        id: "quinoa-salad", name: "Quinoa & Pomegranate Salad", price: 42, portion: "Large bowl", tags: ["VG", "GF"],
        description: "Quinoa, herbs, pomegranate, roasted squash, toasted seeds and sumac dressing.",
        ingredients: ["Quinoa", "Roasted butternut squash", "Pomegranate", "Parsley & mint", "Pumpkin seeds", "Sumac dressing"],
        allergens: "None of the 14 major allergens",
        specialty: "Naturally gluten-free and vegan, and still the most popular salad we make.",
      },
      {
        id: "burrata", name: "Burrata & Heirloom Tomatoes", price: 54, portion: "Serves 1–2", tags: ["V"],
        description: "Creamy burrata, heirloom tomatoes, basil oil and grilled sourdough.",
        ingredients: ["Burrata", "Heirloom tomatoes", "Basil oil", "Aged balsamic", "Sea salt", "Grilled sourdough"],
        allergens: "Gluten, Dairy",
        specialty: "Burrata arrives fresh from Italy twice a week.",
      },
    ],
  },
  {
    id: "dinner",
    title: "Dinner",
    hours: "From 5 PM",
    intro: "Evenings by the oven — flatbreads, slow-cooked plates and something sweet to finish.",
    image: "order-sourdough-loaf",
    items: [
      SOURDOUGH,
      {
        id: "bread-service", name: "Sourdough Bread Service", price: 24, portion: "Serves 2", tags: ["V"], image: "order-sourdough-loaf",
        description: "Warm sourdough, cultured butter, olive oil and za’atar for the table.",
        ingredients: ["Heritage Sourdough", "Cultured butter", "Extra-virgin olive oil", "Za’atar", "Sea salt"],
        allergens: "Gluten, Dairy, Sesame",
        specialty: "Served warm from the oven with butter we culture ourselves.",
      },
      {
        id: "flatbread-margherita", name: "Flatbread Margherita", price: 52, portion: "30 cm", tags: ["V"],
        description: "Slow-proved dough, San Marzano tomato, fior di latte and basil.",
        ingredients: ["48-hour dough", "San Marzano tomato", "Fior di latte", "Fresh basil", "Olive oil"],
        allergens: "Gluten, Dairy",
        specialty: "Dough proved for 48 hours for a light, blistered crust.",
      },
      {
        id: "lamb-shoulder", name: "Slow-Cooked Lamb Shoulder", price: 89, portion: "350 g", tags: ["New"],
        description: "Seven-hour lamb, freekeh, yoghurt and charred flatbread.",
        ingredients: ["Lamb shoulder", "Freekeh", "Garlic yoghurt", "Pomegranate molasses", "Herbs", "Charred flatbread"],
        allergens: "Gluten, Dairy",
        specialty: "Cooked for seven hours in our bread oven as it cools down overnight.",
      },
      {
        id: "mushroom-tartine", name: "Wild Mushroom Tartine", price: 48, portion: "2 slices", tags: ["V"],
        description: "Garlic mushrooms, thyme, aged parmesan and a crispy egg on sourdough.",
        ingredients: ["Sourdough", "Wild mushrooms", "Garlic", "Thyme", "Aged parmesan", "Crispy egg", "Truffle oil"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "A mix of seasonal wild mushrooms, finished with a drizzle of truffle oil.",
      },
      {
        id: "basque-cheesecake", name: "Basque Burnt Cheesecake", price: 38, portion: "1 slice", tags: ["V", "GF"],
        description: "Caramelised outside, barely set inside, with seasonal fruit.",
        ingredients: ["Cream cheese", "Fresh cream", "Free-range eggs", "Sugar", "Vanilla", "Seasonal fruit"],
        allergens: "Dairy, Eggs",
        specialty: "Baked very hot so the top burns to caramel while the centre stays creamy.",
      },
    ],
  },
  {
    id: "sweets",
    title: "Pastries & Sweets",
    hours: "All day",
    intro: "From the pastry counter — tarts, buns and little treats to take home, all day long.",
    image: "hero-croissant",
    items: [
      {
        id: "vanilla-honey-brioche", name: "Vanilla Honey Brioche", price: 16, portion: "150 g", tags: ["V"],
        description: "Soft brioche bun glazed with wildflower honey and Madagascan vanilla.",
        ingredients: ["Brioche dough", "Wildflower honey", "Madagascan vanilla", "Cultured butter", "Pearl sugar"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Glazed straight out of the oven so the honey soaks into the crust.",
      },
      {
        id: "cinnamon-roll", name: "Cinnamon Roll", price: 16, portion: "160 g", tags: ["V"],
        description: "Swirled with brown-butter cinnamon sugar and finished with cream cheese glaze.",
        ingredients: ["Enriched dough", "Brown butter", "Ceylon cinnamon", "Brown sugar", "Cream cheese glaze"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Ceylon cinnamon and brown butter make it warm and toffee-like.",
      },
      {
        id: "berry-danish", name: "Mixed Berry Danish", price: 18, portion: "130 g", tags: ["V"],
        description: "Flaky Danish pastry with vanilla custard and fresh mixed berries.",
        ingredients: ["Danish pastry", "Vanilla crème pâtissière", "Raspberries", "Blueberries", "Apricot glaze"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Topped with fresh berries after baking, so they stay bright and juicy.",
      },
      {
        id: "pistachio-croissant", name: "Pistachio Cream Croissant", price: 22, portion: "110 g", tags: ["New", "N"],
        description: "Croissant filled with silky pistachio cream and topped with crushed pistachios.",
        ingredients: ["Croissant", "Pistachio cream", "Crushed pistachios", "White chocolate drizzle"],
        allergens: "Gluten, Dairy, Eggs, Nuts",
        specialty: "Made with pure pistachio paste — no colouring, no almond filler.",
      },
      {
        id: "madeleines", name: "Brown Butter Madeleines", price: 14, portion: "3 pieces", tags: ["V"],
        description: "Classic shell-shaped cakes with brown butter and lemon zest, baked to order.",
        ingredients: ["Flour", "Brown butter", "Free-range eggs", "Sugar", "Lemon zest", "Honey"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Baked in small batches through the day so they’re always warm.",
      },
      {
        id: "raspberry-tart", name: "Raspberry Jewel Tart", price: 24, portion: "130 g", tags: ["V"],
        description: "Sweet shortcrust, vanilla crème pâtissière and glossy fresh raspberries.",
        ingredients: ["Sweet shortcrust", "Vanilla crème pâtissière", "Fresh raspberries", "Raspberry glaze"],
        allergens: "Gluten, Dairy, Eggs",
        specialty: "Pastry blind-baked until deep golden for a crisp, buttery snap.",
      },
      {
        id: "chocolate-tart", name: "Dark Chocolate Tart", price: 26, portion: "140 g", tags: ["Signature", "V"],
        description: "Bittersweet chocolate ganache in a cocoa pastry shell with a pinch of sea salt.",
        ingredients: ["Cocoa shortcrust", "70% dark chocolate", "Fresh cream", "Butter", "Sea salt flakes"],
        allergens: "Gluten, Dairy, Eggs, Soy",
        specialty: "A silky ganache set at room temperature, never chilled hard.",
      },
      {
        id: "caramel-pretzel", name: "Caramel Glazed Pretzel", price: 15, portion: "130 g", tags: ["V"],
        description: "Soft-baked pretzel, dipped in caramel and sprinkled with pretzel salt.",
        ingredients: ["Pretzel dough", "Salted caramel", "Pretzel salt", "Butter"],
        allergens: "Gluten, Dairy",
        specialty: "Dipped in a traditional bath before baking for its deep mahogany crust.",
      },
    ],
  },
];

/** Every item that can go in the cart, by id. */
const catalog = new Map<string, MenuItem>();
for (const s of menu) for (const i of s.items) if (!catalog.has(i.id)) catalog.set(i.id, i);

export const getItem = (id: string) => catalog.get(id);
export const allItems = () => [...catalog.values()];

export const TAG_LABELS: Record<Tag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  N: "Contains nuts",
  New: "New",
  Signature: "Signature",
};
