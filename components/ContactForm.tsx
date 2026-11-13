"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ButtonArrow } from "./Icons";

/** Contact form — opens the visitor's email app with the message pre-filled to the bakery's address. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Enquiry from ${d.get("name")}`);
    const body = encodeURIComponent(
      `${d.get("message")}\n\n— ${d.get("name")}\n${d.get("email")}${d.get("phone") ? `\n${d.get("phone")}` : ""}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="prose">
        <h2 style={{ marginTop: 0 }}>Thank you!</h2>
        <p>Your email app should now be open with your message — just press send and we’ll reply soon.</p>
        <p>
          Nothing happened? Email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <input className="cta-text-field" name="name" placeholder="Your name" aria-label="Your name" required />
      <input className="cta-text-field" name="email" type="email" placeholder="Email address" aria-label="Email address" required />
      <input className="cta-text-field" name="phone" type="tel" placeholder="Phone (optional)" aria-label="Phone" />
      <textarea className="cta-text-field" name="message" placeholder="How can we help?" aria-label="Message" required />
      <button type="submit" className="primary-button single">
        <div>SEND MESSAGE</div>
        <ButtonArrow variant="single" />
      </button>
    </form>
  );
}
