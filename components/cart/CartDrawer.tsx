"use client";

import { useEffect, useRef } from "react";
import { img } from "@/lib/images";
import { useCart } from "./CartProvider";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Floating cart button (bottom-right), the slide-in cart panel and the "Added" toast. */
export default function CartDrawer() {
  const { lines, count, total, isOpen, open, close, setQty, clear, toast } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevCount = useRef(count);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Little bounce on the cart button whenever something is added.
  useEffect(() => {
    if (count > prevCount.current && fabRef.current) {
      fabRef.current.classList.remove("bump");
      void fabRef.current.offsetWidth;
      fabRef.current.classList.add("bump");
    }
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={`cart-fab${count ? " has-items" : ""}`}
        onClick={open}
        aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12l-1 13H7L6 7Z" />
          <path d="M9 7V6a3 3 0 0 1 6 0v1" />
        </svg>
        {count > 0 && (
          <span key={count} className="cart-fab-count">
            {count}
          </span>
        )}
      </button>

      {toast && (
        <div key={toast.id} className="cart-toast" role="status">
          {toast.text}
          <button type="button" onClick={open}>
            View cart
          </button>
        </div>
      )}

      <div className={`cart-overlay${isOpen ? " is-open" : ""}`} onClick={close} aria-hidden={!isOpen} />
      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`cart-panel${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <header className="cart-head">
          <div>
            <div className="page-eyebrow">Your order</div>
            <div className="cart-title">Cart {count > 0 && <span>({count})</span>}</div>
          </div>
          <button type="button" className="cart-close" onClick={close} aria-label="Close cart">
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <a href="/menu" className="read-more">
              Browse the menu →
            </a>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="cart-line">
                  <div className="cart-thumb">
                    {item.image ? <img {...img(item.image)} sizes="64px" alt="" /> : <span>{initials(item.name)}</span>}
                  </div>
                  <div className="cart-line-info">
                    <div className="cart-line-name">{item.name}</div>
                    <div className="page-meta">AED {item.price} each</div>
                    <div className="add-stepper add-btn-sm">
                      <button type="button" onClick={() => setQty(item.id, qty - 1)} aria-label={`Remove one ${item.name}`}>
                        −
                      </button>
                      <span key={qty} className="add-stepper-count">
                        {qty}
                      </span>
                      <button type="button" onClick={() => setQty(item.id, qty + 1)} aria-label={`Add one ${item.name}`}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line-end">
                    <div className="cart-line-total">AED {item.price * qty}</div>
                    <button type="button" className="cart-remove" onClick={() => setQty(item.id, 0)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="cart-foot">
              <div className="cart-subtotal">
                <span className="page-eyebrow">Subtotal</span>
                <span>AED {total}</span>
              </div>
              <a href="/order-online" className="cart-checkout">
                Checkout — today
              </a>
              <a href="/pre-order" className="cart-checkout is-secondary">
                Pre-order for later
              </a>
              <button type="button" className="cart-clear" onClick={clear}>
                Empty cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
