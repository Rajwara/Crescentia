import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { ARROW, img } from "@/lib/images";
import { formatDate, posts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Stories, recipes and baking notes from the ${site.name} kitchen.`,
};

export default function BlogPage() {
  const [featured, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <PageShell
      current="/blog"
      eyebrow="The Journal"
      title="From the Oven"
      lead="Stories, techniques and slow-morning rituals from our bakery in Dubai."
    >
      <a href={`/blog/${featured.slug}`} className="blog-featured">
        <img {...img(featured.image)} sizes="(max-width: 991px) 100vw, 560px" alt={featured.title} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="page-meta">
            {featured.category} · {formatDate(featured.date)}
          </div>
          <div className="blog-card-title">{featured.title}</div>
          <div className="blog-card-excerpt">{featured.excerpt}</div>
          <span className="read-more">
            Read article <img src={ARROW} alt="" />
          </span>
        </div>
      </a>
      <div className="blog-grid">
        {rest.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
            <div className="blog-card-image">
              <img {...img(p.image)} loading="lazy" sizes="(max-width: 479px) 85vw, 320px" alt={p.title} />
            </div>
            <div className="page-meta">
              {p.category} · {formatDate(p.date)}
            </div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <span className="read-more">
              Read article <img src={ARROW} alt="" />
            </span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
