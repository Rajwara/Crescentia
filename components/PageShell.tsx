import Footer from "./Footer";
import Navbar from "./Navbar";
import WebflowRuntime from "./WebflowRuntime";
import { img } from "@/lib/images";

/** Layout for the simple content pages: navbar, title block, content, footer. */
export default function PageShell({
  current,
  eyebrow,
  title,
  lead,
  narrow,
  wide,
  children,
}: {
  current?: string;
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  narrow?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar current={current} />
      <section className="page-section">
        <div className={`page-container${narrow ? " narrow" : ""}${wide ? " wide" : ""}`}>
          <header className="page-hero">
            <img {...img("gradient-404")} sizes="900px" alt="" className="page-hero-glow" />
            {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
            <h1 className="page-title">{title}</h1>
            {lead && <div className="page-lead">{lead}</div>}
          </header>
          {children}
        </div>
      </section>
      <Footer />
      <WebflowRuntime page="product" />
    </>
  );
}
