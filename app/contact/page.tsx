import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageShell from "@/components/PageShell";
import { fullAddress, phoneHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} in ${site.address.city} — orders, events and general enquiries.`,
};

export default function ContactPage() {
  return (
    <PageShell
      current="/contact"
      eyebrow="Get in Touch"
      title="Contact Us"
      lead="Questions, custom orders or event catering — we’d love to hear from you."
    >
      <div className="contact-grid">
        <div className="contact-list">
          <div className="contact-item">
            <div className="page-eyebrow">Visit</div>
            <a className="contact-value" href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              {fullAddress}
            </a>
          </div>
          <div className="contact-item">
            <div className="page-eyebrow">Email</div>
            <a className="contact-value" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div className="contact-item">
            <div className="page-eyebrow">Phone</div>
            <a className="contact-value" href={phoneHref}>
              {site.phone}
            </a>
          </div>
          <div className="contact-item">
            <div className="page-eyebrow">Open Hours</div>
            {site.hours.map((h) => (
              <div key={h.label} className="contact-value">
                {h.label}: {h.value}
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </PageShell>
  );
}
