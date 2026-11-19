import type { Metadata } from "next";
import { ButtonArrow } from "@/components/Icons";
import PageShell from "@/components/PageShell";
import { img } from "@/lib/images";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `What our guests say about ${site.name}.`,
};

export default function ReviewsPage() {
  return (
    <PageShell
      current="/reviews"
      eyebrow="Seen In and Loved By"
      title="Reviews"
      lead="Kind words from the guests and food writers who visit our bakery."
    >
      <div className="review-list">
        {reviews.map((r, i) => (
          <figure key={r.name} className="review-item">
            <img {...img(r.image)} loading="lazy" sizes="160px" alt="" className="review-photo" />
            <div>
              <blockquote className="review-quote">{r.quote}</blockquote>
              <figcaption className="page-meta">
                {r.name} · {r.position} · 0{i + 1} / 0{reviews.length}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="page-cta" style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div className="page-lead">Visited us recently? We’d love to hear about it.</div>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`My review of ${site.name}`)}`}
          className="primary-button single w-inline-block"
        >
          <div>SHARE YOUR EXPERIENCE</div>
          <ButtonArrow variant="single" />
        </a>
      </div>
    </PageShell>
  );
}
