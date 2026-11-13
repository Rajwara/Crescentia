import { fullAddress, phoneHref, site } from "@/lib/site";
import { PlusIcon } from "./Icons";

export default function Footer() {
  return (
    <section data-w-id="e15efaf0-fac7-f95e-3f4d-7232c68fdebb" className="footer-section">
      <div className="footer-cursor">
        <div className="footer-cursor-icon w-embed">
          <PlusIcon />
        </div>
      </div>
      <div className="w-layout-blockcontainer footer-container w-container">
        <div className="footer-block">
          <div className="footer-inner-block-1">
            <div className="footer-menu-block">
              {site.social.map((s) => (
                <a key={s.label} href={s.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                  ({s.label})
                </a>
              ))}
            </div>
            <div className="footer-text-1">{site.tagline}</div>
          </div>
          <div className="footer-inner-block-2">
            <div className="footer-flex-1 _2nd">
              <div className="footer-flex-2">
                <div className="footer-text-2">OUR STORE</div>
                <a href={site.mapUrl} className="footer-text-4 footer-plain-link" target="_blank" rel="noopener noreferrer">
                  {fullAddress}
                </a>
              </div>
              <div className="footer-flex-2">
                <div className="footer-text-2">EMAIL</div>
                <a href={`mailto:${site.email}`} className="footer-text-4 footer-plain-link">
                  {site.email}
                </a>
              </div>
              <div className="footer-flex-2">
                <div className="footer-text-2">PHONE NUMBER</div>
                <a href={phoneHref} className="footer-text-4 footer-plain-link">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="footer-flex-2">
              <div className="footer-text-2">OPEN HOURS</div>
              {site.hours.map((h) => (
                <div key={h.label} className="footer-text-4">
                  {h.label}: {h.value}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-inner-block-3">
            <div className="footer-text-5">{site.name}</div>
            <div className="footer-flex-3">
              <div className="footer-link-columns">
                <div className="footer-flex-4">
                  <div className="footer-text-2">PAGES</div>
                  {site.footerPages.map((l) => (
                    <a key={l.href} href={l.href} className="footer-text-3">
                      {l.label}
                    </a>
                  ))}
                </div>
                <div className="footer-flex-4">
                  <div className="footer-text-2">LEGAL</div>
                  {site.footerLegal.map((l) => (
                    <a key={l.href} href={l.href} className="footer-text-3">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="footer-text-6">
                © {new Date().getFullYear()} {site.name}. ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
