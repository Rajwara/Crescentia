"use client";

import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/images";
import { menu, TAG_LABELS } from "@/lib/menu";
import AddToCart from "./cart/AddToCart";

const STICKY_TOP = 96; // where section tiles stick (below the category bar)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Full menu with:
 *  - a sticky category bar that follows the scroll (scroll-spy) with a sliding indicator
 *  - per-section "tiles" that stick beside the dishes, then fade/slide away as the next section arrives
 *  - dishes that rise into view in a staggered sequence
 */
export default function MenuBrowser() {
  const [active, setActive] = useState(menu[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll-driven effects: active tab + tile enter/leave progress.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = tabsRef.current?.getBoundingClientRect().height ?? 60;
      const vh = window.innerHeight;
      let current = menu[0].id;
      for (const s of menu) {
        const sec = sectionRefs.current[s.id];
        const tile = tileRefs.current[s.id];
        if (!sec || !tile) continue;
        const r = sec.getBoundingClientRect();
        if (r.top - bar - 40 <= 0) current = s.id;
        if (reduce) continue;
        const h = tile.offsetHeight;
        // 0 → 1 once the end of this section starts pushing the sticky tile up and out of view
        const leave = clamp((STICKY_TOP + h - r.bottom) / (h * 0.6));
        // 0 → 1 while the section travels through the viewport (for the image)
        const travel = clamp((vh - r.top) / (r.height + vh));
        // 1 → 0 as the section's top rises through the lower part of the screen
        const enter = clamp((r.top - vh * 0.7) / (vh * 0.3));
        tile.style.setProperty("--leave", leave.toFixed(3));
        tile.style.setProperty("--enter", enter.toFixed(3));
        tile.style.setProperty("--travel", travel.toFixed(3));
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Slide the indicator under the active tab and keep it visible in the (scrollable) bar.
  useEffect(() => {
    const bar = tabsRef.current;
    const btn = bar?.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`);
    if (!bar || !btn || !indicatorRef.current) return;
    indicatorRef.current.style.width = `${btn.offsetWidth}px`;
    indicatorRef.current.style.transform = `translateX(${btn.offsetLeft}px)`;
    const scroller = bar.querySelector<HTMLDivElement>(".menu-tabs-inner");
    if (scroller) scroller.scrollTo({ left: btn.offsetLeft - scroller.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  // Reveal dishes as they enter the viewport.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".menu-dish, .menu-sec-tile");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (id: string) => {
    const sec = sectionRefs.current[id];
    if (!sec) return;
    const bar = tabsRef.current?.getBoundingClientRect().height ?? 60;
    window.scrollTo({ top: window.scrollY + sec.getBoundingClientRect().top - bar - 8, behavior: "smooth" });
  };

  return (
    <div className="menu-page">
      <div className="menu-tabs" ref={tabsRef}>
        <div className="menu-tabs-inner" role="tablist" aria-label="Menu sections">
          {menu.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              data-tab={s.id}
              aria-selected={active === s.id}
              className={`menu-tab${active === s.id ? " is-active" : ""}`}
              onClick={() => goTo(s.id)}
            >
              {s.title}
              <span className="menu-tab-hours">{s.hours}</span>
            </button>
          ))}
          <span className="menu-tabs-indicator" ref={indicatorRef} aria-hidden />
        </div>
      </div>

      {menu.map((s, si) => (
        <section
          key={s.id}
          id={s.id}
          className="menu-sec"
          ref={(el) => {
            sectionRefs.current[s.id] = el;
          }}
          aria-labelledby={`${s.id}-title`}
        >
          <div className="menu-sec-aside">
            <div
              className="menu-sec-tile"
              ref={(el) => {
                tileRefs.current[s.id] = el;
              }}
            >
              <div className="menu-sec-num">0{si + 1}</div>
              <div className="page-eyebrow">{s.hours}</div>
              <h2 id={`${s.id}-title`} className="menu-sec-title">
                {s.title}
              </h2>
              <p className="menu-sec-intro">{s.intro}</p>
              <div className="menu-sec-art">
                <img {...img("gradient-404")} sizes="400px" alt="" className="menu-sec-glow" />
                <img {...img(s.image)} sizes="(max-width: 767px) 60vw, 360px" alt="" className="menu-sec-image" />
              </div>
              <div className="page-meta">{s.items.length} dishes</div>
            </div>
          </div>

          <div className="menu-sec-items">
            {s.items.map((item, i) => (
              <article key={item.id} className="menu-dish" style={{ "--i": i } as React.CSSProperties}>
                {item.image && (
                  <div className="menu-dish-thumb">
                    <img {...img(item.image)} sizes="96px" alt="" loading="lazy" />
                  </div>
                )}
                <div className="menu-dish-body">
                  <div className="menu-dish-head">
                    <h3 className="menu-dish-name">
                      {item.product ? <a href={`/menu/${item.product}`}>{item.name}</a> : item.name}
                    </h3>
                    <span className="menu-dish-dots" aria-hidden />
                    <span className="menu-dish-price">AED {item.price}</span>
                  </div>
                  <p className="menu-dish-desc">{item.description}</p>
                  <div className="menu-dish-foot">
                    <div className="menu-dish-tags">
                      {item.tags?.map((t) => (
                        <span key={t} className={`menu-tag${t === "Signature" || t === "New" ? " is-strong" : ""}`} title={TAG_LABELS[t]}>
                          {t === "Signature" || t === "New" ? t : TAG_LABELS[t]}
                        </span>
                      ))}
                    </div>
                    <AddToCart id={item.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
