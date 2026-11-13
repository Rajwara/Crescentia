import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonArrow } from "@/components/Icons";
import PageShell from "@/components/PageShell";
import { ARROW, img } from "@/lib/images";
import { formatDate, getPost, posts } from "@/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", publishedTime: p.date, images: [img(p.image).src] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageShell
      current="/blog"
      narrow
      eyebrow={`${post.category} · ${formatDate(post.date)} · ${post.readTime}`}
      title={post.title}
      lead={post.excerpt}
    >
      <article className="prose">
        <img {...img(post.image)} sizes="(max-width: 600px) 100vw, 560px" alt={post.title} className="prose-image" />
        {post.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i}>{b.text}</h2>
          ) : b.type === "quote" ? (
            <blockquote key={i}>{b.text}</blockquote>
          ) : (
            <p key={i}>{b.text}</p>
          )
        )}
      </article>

      <hr className="divider" />

      <div className="page-eyebrow" style={{ marginBottom: 32 }}>
        Keep Reading
      </div>
      <div className="blog-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {more.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
            <div className="page-meta">{formatDate(p.date)}</div>
            <div className="blog-card-title">{p.title}</div>
            <span className="read-more">
              Read article <img src={ARROW} alt="" />
            </span>
          </a>
        ))}
      </div>

      <div className="page-cta">
        <a href="/blog" className="primary-button single w-inline-block">
          <div>ALL ARTICLES</div>
          <ButtonArrow variant="single" />
        </a>
      </div>
    </PageShell>
  );
}
