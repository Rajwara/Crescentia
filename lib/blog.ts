import type { ImageName } from "./images";

export type Block = { type: "p" | "h2" | "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  readTime: string;
  image: ImageName;
  body: Block[];
};

/** Blog posts. Add a new object here to publish a new post — the list and post pages update automatically. */
export const posts: Post[] = [
  {
    slug: "why-we-ferment-our-sourdough-for-36-hours",
    title: "Why We Ferment Our Sourdough for 36 Hours",
    excerpt:
      "Time is the one ingredient we never rush. Here’s what a long, cold fermentation does for flavour, texture and digestibility.",
    date: "2026-10-28",
    category: "Craft",
    readTime: "4 min read",
    image: "heritage-sourdough",
    body: [
      { type: "p", text: "Every Heritage Sourdough that leaves our ovens started its life a day and a half earlier. It’s the slowest thing we make — and it’s slow on purpose." },
      { type: "h2", text: "Flavour needs time" },
      { type: "p", text: "During a long, cool fermentation the wild yeasts and lactic bacteria in our starter work through the flour at their own pace. They produce the gentle acidity and the deep, almost nutty notes you can’t get from a quick commercial loaf." },
      { type: "h2", text: "A better crust and crumb" },
      { type: "p", text: "Extra time lets the dough develop a strong, elastic structure. That gives us the open, glossy crumb and the blistered crust that crackles as it cools on the rack." },
      { type: "quote", text: "Flour, water, salt and time — the time is what makes it ours." },
      { type: "h2", text: "Kinder to digest" },
      { type: "p", text: "Long fermentation breaks down more of the flour’s starches and proteins before the loaf is baked, which many of our guests tell us makes it easier to enjoy every day." },
    ],
  },
  {
    slug: "the-art-of-the-twice-baked-croissant",
    title: "The Art of the Twice-Baked Croissant",
    excerpt:
      "Yesterday’s croissant, reborn. How almond cream, a light syrup and a second bake create our most-loved pastry.",
    date: "2026-10-12",
    category: "Pastry",
    readTime: "3 min read",
    image: "twice-baked-almond-croissant",
    body: [
      { type: "p", text: "The twice-baked almond croissant began as a baker’s trick to give day-old croissants a second life. Today it’s the pastry our regulars ask for first." },
      { type: "h2", text: "Start with lamination" },
      { type: "p", text: "Everything depends on the croissant itself: dozens of thin layers of cultured butter and dough, folded by hand and proofed slowly so each layer stays distinct." },
      { type: "h2", text: "Then the second bake" },
      { type: "p", text: "We split each croissant, brush it with a light vanilla syrup, fill it with frangipane and top it with toasted almonds. A second trip through the oven turns the outside crisp and caramelised while the centre stays soft." },
      { type: "quote", text: "Crisp outside, tender inside, and just enough sweetness." },
      { type: "p", text: "A final dusting of powdered sugar and it’s ready — best enjoyed the same morning with a strong coffee." },
    ],
  },
  {
    slug: "a-baking-guide-to-dubai-mornings",
    title: "A Baker’s Guide to Slow Dubai Mornings",
    excerpt:
      "From pre-ordering your weekend loaf to pairing pastries with coffee — small rituals for a slower, sweeter start to the day.",
    date: "2026-09-30",
    category: "Lifestyle",
    readTime: "5 min read",
    image: "sea-salt-caramel-brioche",
    body: [
      { type: "p", text: "Dubai moves fast. Our mornings don’t have to. A few small rituals can turn breakfast into the calmest part of the day." },
      { type: "h2", text: "Pre-order your favourites" },
      { type: "p", text: "Our signature bakes sell out early, especially at weekends. Pre-order the evening before and your bread will be waiting, still warm, when you arrive." },
      { type: "h2", text: "Pair with care" },
      { type: "p", text: "A buttery brioche loves a flat white; the savoury depth of a miso butter scone is perfect with black coffee or a fragrant karak. Sourdough needs nothing more than good olive oil and a pinch of salt." },
      { type: "h2", text: "Store it right" },
      { type: "p", text: "Keep crusty loaves cut-side down on a wooden board under a linen cloth, never in the fridge. Brioche and pastries are best on the day — or wrapped and frozen, then warmed in the oven for a few minutes." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
