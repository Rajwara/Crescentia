"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { img } from "@/lib/images";
import { getItem } from "@/lib/menu";
import { products } from "@/lib/products";
import { phoneHref, site } from "@/lib/site";
import { useCart } from "./cart/CartProvider";
import AddToCart from "./cart/AddToCart";
import ItemImage from "./ItemImage";
import { ButtonArrow } from "./Icons";

type Mode = "order" | "preorder";

const TIME_SLOTS = ["10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 5:00 PM"];
const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Checkout for the cart (Order Online = today, Pre-Order = a later date). Until an online shop or
 * payment service is connected, it sends the order to the bakery by opening the customer's email app
 * with every detail filled in. ?item=<id> adds that item to the cart first.
 */
export default function OrderForm({ mode }: { mode: Mode }) {
  const { lines, total, ensure, clear } = useCart();
  const [method, setMethod] = useState<"Pickup" | "Delivery">("Pickup");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const handledItem = useRef(false);

  useEffect(() => {
    if (handledItem.current) return;
    handledItem.current = true;
    const id = new URLSearchParams(window.location.search).get("item");
    // Wait a tick so the saved cart has loaded first.
    if (id && getItem(id)) setTimeout(() => ensure(id), 0);
  }, [ensure]);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return isoDate(d);
  }, []);

  const suggestions = products.filter((p) => !lines.some((l) => l.item.id === p.slug));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lines.length) {
      setError("Your cart is empty — add at least one item.");
      return;
    }
    setError("");
    const f = new FormData(e.currentTarget);
    const title = mode === "order" ? "Online order" : "Pre-order";
    const body = [
      `${title} — ${site.name}`,
      "",
      ...lines.map((l) => `• ${l.qty} × ${l.item.name} (AED ${l.item.price} each)`),
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
    clear();
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
          <a href={phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="order-layout" onSubmit={onSubmit}>
      <div className="order-step">
        <div className="page-eyebrow">1 · Your order</div>
        {lines.length === 0 ? (
          <div className="order-empty">
            <p>Your cart is empty.</p>
            <a href="/menu" className="read-more">
              Browse the full menu →
            </a>
          </div>
        ) : (
          <div className="order-products">
            {lines.map(({ item, qty }) => (
              <div key={item.id} className="order-product is-selected">
                <div className="order-product-media">
                  <ItemImage item={item} sizes="88px" showLabel={false} />
                </div>
                <div className="order-product-info">
                  <div className="order-product-name">{item.name}</div>
                  <div className="page-meta">
                    AED {item.price} × {qty} = AED {item.price * qty}
                  </div>
                </div>
                <AddToCart id={item.id} />
              </div>
            ))}
          </div>
        )}
        <div className="order-total">
          <span className="page-eyebrow">Estimated total</span>
          <span className="order-total-value">AED {total}</span>
        </div>
        {error && <div className="order-error">{error}</div>}

        {suggestions.length > 0 && (
          <div className="order-suggest">
            <div className="page-eyebrow">Add a signature bake</div>
            {suggestions.map((p) => (
              <div key={p.slug} className="order-suggest-row">
                <img {...img(p.image)} sizes="48px" alt="" loading="lazy" />
                <span>
                  {p.name} <span className="page-meta">· {p.price}</span>
                </span>
                <AddToCart id={p.slug} />
              </div>
            ))}
            <a href="/menu" className="read-more">
              See the full menu →
            </a>
          </div>
        )}
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
