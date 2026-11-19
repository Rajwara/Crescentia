import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { ARROW, img } from "@/lib/images";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Signature Collection",
  description: `Sourdough, viennoiserie and pastries from ${site.name}, baked fresh every morning in ${site.address.city}.`,
};

export default function CollectionPage() {
  return (
    <PageShell
      current="/collection"
      eyebrow="Baked Fresh Every Morning"
      title="The Signature Collection"
      lead="Small-batch bakes made with heritage flours, cultured butter and plenty of time."
    >
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.slug} className="product-card">
            <a href={`/menu/${p.slug}`} className="blog-card">
              <div className="blog-card-image">
                <img {...img(p.image)} loading="lazy" sizes="(max-width: 767px) 85vw, 440px" alt={p.name} />
              </div>
              <div className="page-meta">{p.category}</div>
              <div className="product-card-row">
                <div className="blog-card-title">{p.name}</div>
                <div className="product-card-price">{p.price}</div>
              </div>
              <div className="blog-card-excerpt">{p.intro}</div>
            </a>
            <div className="product-card-actions">
              <a href={`/menu/${p.slug}`} className="read-more">
                Details <img src={ARROW} alt="" />
              </a>
              <a href={`/order-online?item=${p.slug}`} className="read-more">
                Order <img src={ARROW} alt="" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
