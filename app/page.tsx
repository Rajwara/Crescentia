import Footer from "@/components/Footer";
import { ButtonArrow, PlusIcon } from "@/components/Icons";
import MenuCollection from "@/components/MenuCollection";
import NewsletterForm from "@/components/NewsletterForm";
import WebflowRuntime from "@/components/WebflowRuntime";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

const heroImageStyle: React.CSSProperties = {
  transform: "translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(180deg) skew(0, 0)",
  opacity: 0,
};

const testimonials = [
  { quote: "“One of the most beautifully branded bakeries in the city.”", name: "Dubai Food Edit" },
  { quote: "“Perfect texture, perfect balance — it’s not just bread, it’s art.”", name: "Eat This Daily" },
  { quote: "“The sourdough alone is worth the trip across town.”", name: "Indie Table" },
];
const slideIds = [
  "20900d37-e558-63d2-3d4d-7ed181a45a71",
  "20900d37-e558-63d2-3d4d-7ed181a45a72",
  "8f42e3b0-be11-f787-8fdc-4de970dca21d",
];

const HOME_NAV = [
  { label: "ABOUT", href: "#About" },
  { label: "COLLECTION", href: "#Menu" },
  { label: "REVIEWS", href: "#Testimonial" },
  { label: "ORDER", href: "#Order" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export default function HomePage() {
  return (
    <>
      <div data-w-id="ca7d63b8-5e02-43db-1f54-5ec7a60113fd" className="hero-scroll-block">
        <div data-w-id="39aed172-3039-46f7-6d2d-5b0a660be79f" className="navbar-hero">
          <img
            {...img("gradient-hero")}
            loading="lazy"
            sizes="(max-width: 1440px) 100vw, 1440px"
            alt=""
            className="hero-gradient"
          />
          <section className="navbar-section">
            <div className="w-layout-blockcontainer navbar-container w-container">
              <div className="navbar-block">
                <div data-w-id="e1275390-3136-e9ea-aec0-40845d655ca6" className="navbar-menu-icon">
                  <div className="navbar-menu-line _1" />
                  <div className="navbar-menu-line _2" />
                </div>
                <div className="navbar-menu-block">
                  {HOME_NAV.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className={`navbar-link${i === 0 ? " first" : ""}${i === HOME_NAV.length - 1 ? " last" : ""}`}
                    >
                      ({l.label})
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="hero-section">
            <div className="w-layout-blockcontainer hero-container w-container">
              <div className="hero-block">
                <div className="hero-heading-block">
                  <h1 style={{ width: 0 }} className="hero-heading _2">
                    Pastries
                  </h1>
                  <h1 style={{ width: 0 }} className="hero-heading _3">
                    Sourdough
                  </h1>
                </div>
                <div style={{ opacity: 0 }} className="hero-inner-block">
                  <div className="hero-text-1">Crafted Daily Tradition Inspired</div>
                  <a
                    data-w-id="a54e00cc-c8b6-28f5-6e5a-592694a2b95e"
                    href="#Menu"
                    className="primary-button hero w-inline-block"
                  >
                    <div className="text-block-2">BROWSE COLLECTION</div>
                    <ButtonArrow variant="hero" />
                  </a>
                  <div className="hero-text-1 _2nd">Modern Baking Rooted in Craft</div>
                </div>
              </div>
            </div>
          </section>
          <img
            {...img("hero-croissant")}
            loading="lazy"
            style={heroImageStyle}
            sizes="(max-width: 842px) 100vw, 842px"
            alt="Freshly baked croissants"
            className="hero-image"
          />
          <div className="hero-cursor">
            <div className="text-block">Order Now</div>
          </div>
        </div>
        <section className="about-section">
          <div className="w-layout-blockcontainer about-container w-container">
            <div className="about-block">
              <div className="about-heading-block">
                <div className="about-text-1">
                  We return to the roots of slow fermentation, natural leavening, and clean ingredients.
                </div>
                <div className="about-walking-text _1" />
                <div className="about-walking-text _2" />
                <div className="about-walking-text _3" />
                <div className="about-walking-text _4" />
              </div>
              <div className="about-inner-block">
                <div className="about-text-2">“Timeless craft. Contemporary flavor.”</div>
                <div className="about-text-3">{site.name.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </section>
        <div id="About" className="about-trigger" />
      </div>

      <div data-w-id="e74e0e76-09dc-d4d0-9f2f-673e6b4334c6" className="menu-scroll-block">
        <div id="Menu" className="menu-trigger" />
        <div id="Testimonial" className="testimonial-trigger" />
        <MenuCollection sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 940px" />

        <section data-w-id="256338ce-7023-e72f-d0ce-809605e0ba0d" className="testimonal-section">
          <div className="testimonial-circle" />
          <img {...img("testimonial-customer-3")} loading="lazy" sizes="(max-width: 1281px) 100vw, 1281px" alt="" className="testimonial-item-image _3" />
          <img {...img("testimonial-customer-2")} loading="lazy" sizes="(max-width: 1281px) 100vw, 1281px" alt="" className="testimonial-item-image _2" />
          <img {...img("testimonial-customer-1")} loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" alt="" className="testimonial-item-image _1" />
          <div className="testimonial-cursor">
            <div className="testimonial-cursor-icon w-embed">
              <PlusIcon />
            </div>
          </div>
          <div className="w-layout-blockcontainer testimonial-container w-container">
            <div className="testimonial-block">
              <h1 className="testimonial-heading">Seen In and Loved By</h1>
              <div
                data-delay="4000"
                data-animation="slide"
                className="testimonial-slider w-slider"
                data-autoplay="false"
                data-easing="ease"
                data-hide-arrows="false"
                data-disable-swipe="false"
                data-autoplay-limit="0"
                data-nav-spacing="3"
                data-duration="500"
                data-infinite="true"
              >
                <div className="testimonial-mask w-slider-mask">
                  {testimonials.map((t, i) => (
                    <div key={slideIds[i]} data-w-id={slideIds[i]} className="testimonial-slide w-slide">
                      <div className="testimonial-item-block">
                        <div className="testimonial-item-value">{t.quote}</div>
                        <div className="testimonial-item-inner-block">
                          <div className="testimonial-item-flex-1">
                            <div className="testimonial-item-name">{t.name}</div>
                            <div className="testimonial-item-position">CUSTOMER</div>
                          </div>
                          <div className="testimonial-item-count">
                            0{i + 1} / <span className="testimonial-itemtext-span">0{testimonials.length}</span>
                          </div>
                          <div className="testimonial-item-flex-1 _2nd">
                            <div className="testimonial-item-name">{t.name}</div>
                            <div className="testimonial-item-position">CUSTOMER</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-slider-arrow-left">
                  <div className="testimonial-icon w-icon-slider-left" />
                </div>
                <div className="w-slider-arrow-right">
                  <div className="testimonial-icon w-icon-slider-right" />
                </div>
                <div className="slide-nav w-slider-nav w-round w-num" />
              </div>
              <div className="testimonial-text-1">SWIPE FOR MORE</div>
            </div>
          </div>
        </section>
      </div>

      <section id="Order" className="order-section">
        <img {...img("gradient-order")} loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" alt="" className="order-gradient" />
        <div className="w-layout-blockcontainer order-container w-container">
          <div className="order-block">
            <h2 className="order-heading">Fresh to You, On Your Terms</h2>
            <div data-w-id="5bf2847f-2876-b234-d847-fa1541c004c7" style={{ opacity: 0 }} className="order-inner-block">
              <div className="order-flex-block">
                <div className="order-flex-1">
                  <div className="order-text-1">PICK UP</div>
                  <div className="order-text-2">Visit Our Minimalist Café-Style Storefront</div>
                </div>
                <div className="order-text-2">Pre-Order Guaranteed Availability</div>
                <div className="order-text-2">Fast Check-Out With QR Code Scan</div>
              </div>
              <div
                data-delay="2500"
                data-animation="outin"
                className="slider w-slider"
                data-autoplay="true"
                data-easing="ease-out"
                data-hide-arrows="false"
                data-disable-swipe="false"
                data-autoplay-limit="0"
                data-nav-spacing="3"
                data-duration="500"
                data-infinite="true"
              >
                <div className="w-slider-mask">
                  <div className="w-slide">
                    <img {...img("order-sourdough-loaf")} loading="lazy" sizes="(max-width: 650px) 100vw, 650px" alt="Sourdough loaf" />
                  </div>
                  <div className="w-slide">
                    <img {...img("sea-salt-caramel-brioche")} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" alt="Brioche" />
                  </div>
                  <div className="w-slide">
                    <img {...img("miso-butter-scone")} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" alt="Scone" />
                  </div>
                </div>
                <div className="w-slider-arrow-left" />
                <div className="w-slider-arrow-right" />
                <div className="slide-nav-2 w-slider-nav" />
              </div>
              <div className="order-flex-block _2nd">
                <div className="order-flex-1 _2nd">
                  <div className="order-text-1">LOCAL DELIVERY</div>
                  <div className="order-text-2 _2nd">Delivered Same-Day in Eco-Packaging</div>
                </div>
                <div className="order-text-2 _2nd">10AM–5PM Drop Windows</div>
                <div className="order-text-2 _2nd">{site.deliveryArea}</div>
              </div>
            </div>
            <a data-w-id="5072c870-af3f-b45a-113e-98e1a48e125c" href="#Pickup" className="primary-button order w-inline-block">
              <div className="text-block-3">SCHEDULE MY PICKUP</div>
              <ButtonArrow variant="order" />
            </a>
          </div>
        </div>
      </section>

      <div data-w-id="759d50ef-c2f1-9f8c-816c-11b911a87f55" className="page-track">
        <div className="page-camera">
          <div className="page-frame">
            <section data-w-id="5dea8eb4-5de7-7015-6341-57406422b609" id="Pickup" className="cta-section">
              <div className="w-layout-blockcontainer cta-container w-container">
                <div className="cta-block">
                  <div className="cta-heading-block">
                    <a href={`mailto:${site.email}`} className="cta-text-1 cta-email-link">
                      {site.email}
                    </a>
                    <div className="cta-walking-text" />
                  </div>
                  <div className="cta-line" />
                  <div className="cta-inner-block">
                    <div className="cta-text-2">Subscribe to The Journal</div>
                    <div className="cta-flex-1">
                      <div className="cta-text-3">First-time subscribers receive a 15% off code for their first order</div>
                      <NewsletterForm />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </div>
      <WebflowRuntime page="home" />
    </>
  );
}
