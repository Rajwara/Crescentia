import { ARROW, img } from "@/lib/images";
import { products } from "@/lib/products";

/** "The Signature Collection" list — used on the home page and under each product. */
export default function MenuCollection({ current, sizes }: { current?: string; sizes: string }) {
  return (
    <div className="menu-wrapper-block">
      <div className="menu-row-block">
        <section className="menu-section">
          <div className="w-layout-blockcontainer menu-container w-container">
            <div className="menu-block">
              <div className="menu-text">The Signature Collection</div>
              <div className="menu-collection-list-wrapper w-dyn-list">
                <div role="list" className="menu-item-block w-dyn-items">
                  {products.map((p) => (
                    <div key={p.slug} role="listitem" className="menu-collection-item w-dyn-item">
                      <a
                        href={`/menu/${p.slug}`}
                        aria-current={current === p.slug ? "page" : undefined}
                        className={`menu-item w-inline-block${current === p.slug ? " w--current" : ""}`}
                      >
                        <img {...img(p.image)} loading="lazy" alt={p.name} sizes={sizes} className="menu-item-image" />
                        <div className="menu-item-text">{p.name}</div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <a href="/contact" className="menu-flex-1 menu-reserve-link">
          <div>RESERVE LIMITED BATCH</div>
          <img src={ARROW} loading="lazy" alt="" className="menu-icon" />
        </a>
      </div>
    </div>
  );
}
