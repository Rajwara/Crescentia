import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { ButtonArrow } from "@/components/Icons";
import MenuCollection from "@/components/MenuCollection";
import Navbar from "@/components/Navbar";
import WebflowRuntime from "@/components/WebflowRuntime";
import { STAR, img } from "@/lib/images";
import { getProduct, products } from "@/lib/products";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.intro, openGraph: { images: [img(p.image).src] } };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const specs: [string, React.ReactNode][][] = [
    [
      ["CATEGORY", p.category],
      ["WEIGHT", p.weight],
      ["FLAVOUR", p.flavour],
    ],
    [
      ["ALLERGEN CAUTION", p.allergens],
      [
        "RATINGS",
        <div className="single-rating-block" key="r">
          <img src={STAR} loading="lazy" alt="" className="single-rating-icon" />
          <div className="single-text-2">{p.rating}</div>
        </div>,
      ],
      ["PURCHASES", p.purchases],
    ],
  ];

  return (
    <>
      <Navbar current="/#Menu" />
      <section className="single-section">
        <div className="w-layout-blockcontainer single-container w-container">
          <div className="single-block">
            <div className="single-flex-1">
              <img
                {...img("gradient-product")}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                alt=""
                className="single-gradient"
              />
              <h1 className="single-name">{p.name}</h1>
              <div className="single-price">{p.price}</div>
              <img
                {...img(p.image)}
                loading="lazy"
                alt={p.name}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 940px"
                className="single-image"
              />
            </div>
            <div className="single-flex-2">
              <div className="single-value w-richtext">
                <p>{p.intro}</p>
              </div>
              <div className="single-flex-3">
                {specs.map((col, i) => (
                  <div key={i} className="single-flex-4">
                    {col.map(([label, value]) => (
                      <div key={label} className="single-flex-5">
                        <div className="single-text-1">{label}</div>
                        {typeof value === "string" ? <div className="single-text-2">{value}</div> : value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="single-flex-2">
              <div className="single-text-3">What’s Inside?</div>
              <div className="single-value w-richtext">
                <p>{p.insideIntro}</p>
              </div>
              <div className="single-flex-6">
                <div className="single-flex-7">
                  <div className="single-text-4">NUTRIENT</div>
                  <div className="single-text-4">AMOUNT (PER 80 G)</div>
                </div>
                {p.nutrition.map(([n, v], i) => (
                  <div
                    key={n}
                    className={`single-flex-7${i === 0 ? " first" : ""}${i === p.nutrition.length - 1 ? " last" : ""}`}
                  >
                    <div className="single-text-5">{n}</div>
                    <div className="single-text-5">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="single-value w-richtext">
              <p>{p.outro}</p>
            </div>
            <a data-w-id="80a444fb-48ca-0063-4338-25d405588319" href="/contact" className="primary-button single w-inline-block">
              <div>CHAT TO ORDER</div>
              <ButtonArrow variant="single" />
            </a>
          </div>
        </div>
      </section>
      <div data-w-id="4a3db81c-3b04-9836-d138-a80c9fd43623" className="menu-scroll-block single">
        <MenuCollection current={p.slug} sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 940px" />
      </div>
      <Footer />
      <WebflowRuntime page="product" />
    </>
  );
}
