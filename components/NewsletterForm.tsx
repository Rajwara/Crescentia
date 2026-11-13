"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ButtonArrow } from "./Icons";

/**
 * "Subscribe to The Journal" form. Without a mailing-list service connected yet,
 * it opens the visitor's email app with a pre-filled subscribe request to the bakery.
 * (No `w-form` class, so Webflow's own form handler never posts it to Webflow.)
 */
export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("Email");
    const subject = encodeURIComponent("Subscribe me to The Journal");
    const body = encodeURIComponent(`Please add ${email} to The Journal mailing list.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="cta-form-block">
      {!sent ? (
        <form className="cta-form" onSubmit={onSubmit}>
          <input
            className="cta-text-field w-input"
            maxLength={256}
            name="Email"
            placeholder="Your email address"
            type="email"
            id="Email"
            aria-label="Email address"
            required
          />
          <button type="submit" className="primary-button cta">
            <div className="text-block-4">JOIN THE JOURNAL</div>
            <ButtonArrow variant="cta" />
          </button>
        </form>
      ) : (
        <div className="success-message form-message-visible">
          <div>Thank you! Your email app should open — just press send and we’ll add you to The Journal.</div>
        </div>
      )}
    </div>
  );
}
