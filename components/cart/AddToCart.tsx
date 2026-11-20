"use client";

import { useCart } from "./CartProvider";

/** "Add" button that turns into a − qty + stepper once the item is in the cart. */
export default function AddToCart({
  id,
  label = "Add",
  size = "sm",
  variant = "outline",
}: {
  id: string;
  label?: string;
  size?: "sm" | "lg";
  /** "pill" = solid dark button (menu cards) */
  variant?: "outline" | "pill";
}) {
  const { qtyOf, add, setQty } = useCart();
  const n = qtyOf(id);

  if (!n) {
    return (
      <button type="button" className={`add-btn add-btn-${size} add-btn-${variant}`} onClick={() => add(id)}>
        <span className="add-btn-plus" aria-hidden>
          +
        </span>
        {label}
      </button>
    );
  }
  return (
    <div className={`add-stepper add-btn-${size} add-btn-${variant}`} role="group" aria-label="Quantity in cart">
      <button type="button" onClick={() => setQty(id, n - 1)} aria-label="Remove one">
        −
      </button>
      <span key={n} className="add-stepper-count">
        {n}
      </span>
      <button type="button" onClick={() => add(id)} aria-label="Add one">
        +
      </button>
    </div>
  );
}
