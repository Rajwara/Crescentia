import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Icons";
import PageShell from "@/components/PageShell";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story behind ${site.name}, an artisan bakery in Dubai built on slow fermentation and honest ingredients.`,
};

const values = [
  {
    title: "Slow by Design",
    text: "Our sourdough ferments for up to 36 hours. Patience builds flavour, texture and a crust that sings as it cools.",
  },
  {
    title: "Honest Ingredients",
    text: "Heritage flours, cultured butter, free-range eggs and nothing artificial — just simple ingredients treated with care.",
  },
  {
    title: "Baked Every Morning",
    text: "Everything on our shelves is made in small batches the same day, so what you take home is always at its best.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      current="/about"
      eyebrow="Our Story"
      title={`About ${site.name}`}
      lead="A modern bakery in the heart of Dubai, rooted in the old-world craft of natural leavening."
    >
      <div className="about-grid">
        <img {...img("hero-croissant")} sizes="(max-width: 991px) 100vw, 520px" alt="Croissants" />
        <div className="prose">
          <h2 style={{ marginTop: 0 }}>Timeless craft. Contemporary flavour.</h2>
          <p>
            {site.name} began with a simple belief: that great bread takes time. We return to the roots of baking —
            slow fermentation, natural leavening and clean ingredients — and bring them to a city that never slows
            down.
          </p>
          <p>
            Each morning our bakers shape sourdough, laminate croissants by hand and pull golden brioche from the oven,
            so that every loaf and pastry you take home is as fresh as it can be.
          </p>
          <p>
            Our café-style storefront is a quiet corner for a slow coffee and something warm from the oven. Pre-order
            for pickup, or let us deliver same-day across our neighbourhood.
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="values-grid">
        {values.map((v, i) => (
          <div key={v.title} className="value-card">
            <div className="value-num">0{i + 1}</div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <div className="page-cta">
        <a href="/#Menu" className="primary-button single w-inline-block">
          <div>BROWSE THE COLLECTION</div>
          <ButtonArrow variant="single" />
        </a>
      </div>
    </PageShell>
  );
}
