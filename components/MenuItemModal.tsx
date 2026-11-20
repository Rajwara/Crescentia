"use client";

import { useEffect, useRef, useState } from "react";
import { TAG_LABELS, type MenuItem } from "@/lib/menu";
import { useCart } from "./cart/CartProvider";
import ItemImage from "./ItemImage";

/** Popup with everything about a dish: photo, description, specialty, ingredients, allergens, add to cart. */
export default function MenuItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { add, qtyOf } = useCart();
  const [qty, setQty] = useState(1);
  const [shown, setShown] = useState<MenuItem | null>(item);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Keep the last item on screen while the close animation plays.
  useEffect(() => {
    if (item) {
      lastFocus.current = document.activeElement as HTMLElement;
      setShown(item);
      setClosing(false);
      setQty(1);
    } else if (shown) {
      setClosing(true);
      const t = setTimeout(() => {
        setShown(null);
        setClosing(false);
        lastFocus.current?.focus();
      }, 280);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!shown) return null;
  const inCart = qtyOf(shown.id);

  return (
    <div className={`dish-modal${closing ? " is-closing" : ""}`}>
      <div className="dish-modal-overlay" onClick={onClose} />
      <div
        ref={dialogRef}
        className="dish-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex={-1}
      >
        <button type="button" className="dish-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="dish-modal-media">
          <ItemImage item={shown} sizes="(max-width: 767px) 80vw, 420px" className="dish-modal-img" />
        </div>

        <div className="dish-modal-body">
          {!!shown.tags?.length && (
            <div className="dish-modal-tags">
              {shown.tags.map((t) => (
                <span key={t} className={`menu-tag${t === "Signature" || t === "New" ? " is-strong" : ""}`}>
                  {TAG_LABELS[t]}
                </span>
              ))}
            </div>
          )}
          <h2 id="dish-modal-title" className="dish-modal-title">
            {shown.name}
          </h2>
          <div className="dish-modal-price">
            AED {shown.price} <span>· {shown.portion}</span>
          </div>
          <p className="dish-modal-desc">{shown.description}</p>

          <div className="dish-modal-block">
            <div className="page-eyebrow">What makes it special</div>
            <p>{shown.specialty}</p>
          </div>
          <div className="dish-modal-block">
            <div className="page-eyebrow">Ingredients</div>
            <ul className="dish-modal-ingredients">
              {shown.ingredients.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="dish-modal-block">
            <div className="page-eyebrow">Allergens</div>
            <p>{shown.allergens}</p>
          </div>

          <div className="dish-modal-actions">
            <div className="add-stepper add-btn-lg" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Fewer" disabled={qty <= 1}>
                −
              </button>
              <span key={qty} className="add-stepper-count">
                {qty}
              </span>
              <button type="button" onClick={() => setQty((q) => Math.min(50, q + 1))} aria-label="More">
                +
              </button>
            </div>
            <button
              type="button"
              className="dish-modal-add"
              onClick={() => {
                add(shown.id, qty);
                onClose();
              }}
            >
              Add to Cart — AED {shown.price * qty}
            </button>
          </div>
          <div className="dish-modal-foot">
            {inCart > 0 && <span className="page-meta">{inCart} already in your cart</span>}
            {shown.product && (
              <a href={`/menu/${shown.product}`} className="read-more">
                Full product page →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
