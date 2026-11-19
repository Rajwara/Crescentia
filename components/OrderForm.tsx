"use client";

import { useEffect, useMemo, useState } from "react";
import { img } from "@/lib/images";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { ButtonArrow } from "./Icons";

type Mode = "order" | "preorder";

const TIME_SLOTS = ["10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 5:00 PM"];
const priceOf = (p: string) => Number(p.replace(/[^\d.]/g, "")) || 0;
const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Order / pre-order form. Until an online shop or payment service is connected, it sends the order
 * to the bakery by opening the customer's email app with every detail filled in.
 * A product can be preselected with ?item=<product-slug>.
 */
export default function OrderForm({ mode }: { mode: Mode }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [method, setMethod] = useState<"Pickup" | "Delivery">("Pickup");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get("item");
    if (item && products.some((p) => p.slug === item)) setQty({ [item]: 1 });
  }, []);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return isoDate(d);
  }, []);

  const lines = products.filter((p) => (qty[p.slug] ?? 0) > 0);
  const total = lines.reduce((sum, p) => sum + priceOf(p.price) * qty[p.slug], 0);
  const change = (slug: string, d: number) =>
    setQty((q) => ({ ...q, [slug]: Math.min(50, Math.max(0, (q[slug] ?? 0) + d)) }));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lines.length) {
      setError("Please add at least one item.");
      return;
    }
    setError("");
    const f = new FormData(e.currentTarget);
    const title = mode === "order" ? "Online order" : "Pre-order";
    const body = [
      `${title} — ${site.name}`,
      "",
      ...lines.map((p) => `• ${qty[p.slug]} × ${p.name} (${p.price} each)`),
      `Estimated total: AED ${total}`,
      "",
      `${method}: ${mode === "order" ? "Today" : f.get("date")}, ${f.get("slot")}`,
      method === "Delivery" ? `Delivery address: ${f.get("address")}` : "",
      "",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Email: ${f.get("email")}`,
      f.get("notes") ? `Notes: ${f.get("notes")}` : "",
    ]
      .filter((l, i, a) => l !== "" || a[i - 1] !== "")
      .join("\n");
    const subject = `${title} from ${f.get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="prose order-done">
        <h2 style={{ marginTop: 0 }}>Thank you!</h2>
        <p>
          Your email app should now be open with your {mode === "order" ? "order" : "pre-order"} — just press send.
          We’ll confirm availability and payment by phone or email shortly.
        </p>
        <p>
          Nothing happened? Email us at <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="order-layout" onSubmit={onSubmit}>
      <div className="order-step">
        <div className="page-eyebrow">1 · Choose your bakes</div>
        <div className="order-products">
          {products.map((p) => {
            const n = qty[p.slug] ?? 0;
            return (
              <div key={p.slug} className={`order-product${n ? " is-selected" : ""}`}>
                <img {...img(p.image)} sizes="88px" alt="" loading="lazy" />
                <div className="order-product-info">
                  <a href={`/menu/${p.slug}`} className="order-product-name">
                    {p.name}
                  </a>
                  <div className="page-meta">
                    {p.price} · {p.weight}
                  </div>
                </div>
                <div className="qty" aria-label={`Quantity of ${p.name}`}>
                  <button type="button" onClick={() => change(p.slug, -1)} aria-label="Remove one" disabled={!n}>
                    −
                  </button>
                  <span>{n}</span>
                  <button type="button" onClick={() => change(p.slug, 1)} aria-label="Add one">
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-total">
          <span className="page-eyebrow">Estimated total</span>
          <span className="order-total-value">AED {total}</span>
        </div>
        {error && <div className="order-error">{error}</div>}
      </div>

      <div className="order-step">
        <div className="page-eyebrow">2 · {mode === "order" ? "Pickup or delivery today" : "When do you need it?"}</div>
        <div className="order-toggle" role="radiogroup">
          {(["Pickup", "Delivery"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={method === m}
              className={method === m ? "is-active" : ""}
              onClick={() => setMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>
        {mode === "preorder" && (
          <label className="order-field">
            <span className="page-meta">Date</span>
            <input className="cta-text-field" type="date" name="date" min={tomorrow} defaultValue={tomorrow} required />
          </label>
        )}
        <label className="order-field">
          <span className="page-meta">{method === "Pickup" ? "Pickup time" : "Delivery window"}</span>
          <select className="cta-text-field" name="slot" required defaultValue="">
            <option value="" disabled>
              Choose a time
            </option>
            {TIME_SLOTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {method === "Delivery" && (
          <textarea className="cta-text-field" name="address" placeholder="Delivery address" aria-label="Delivery address" required />
        )}

        <div className="page-eyebrow" style={{ marginTop: 24 }}>
          3 · Your details
        </div>
        <input className="cta-text-field" name="name" placeholder="Your name" aria-label="Your name" required />
        <input className="cta-text-field" name="phone" type="tel" placeholder="Phone number" aria-label="Phone number" required />
        <input className="cta-text-field" name="email" type="email" placeholder="Email address" aria-label="Email address" required />
        <textarea
          className="cta-text-field"
          name="notes"
          placeholder={mode === "order" ? "Notes (optional)" : "Notes — allergies, gift message, larger quantities…"}
          aria-label="Notes"
        />
        <button type="submit" className="primary-button single">
          <div>{mode === "order" ? "PLACE ORDER" : "SEND PRE-ORDER"}</div>
          <ButtonArrow variant="single" />
        </button>
      </div>
    </form>
  );
}
