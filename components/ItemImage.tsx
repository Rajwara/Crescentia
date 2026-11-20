"use client";

import { img } from "@/lib/images";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "./cart/CartProvider";

/**
 * Picture for a menu item: an uploaded photo (public/images/menu/<id>.*) if there is one,
 * otherwise the built-in image, otherwise a "photo coming soon" placeholder.
 */
export default function ItemImage({
  item,
  sizes,
  className = "",
  showLabel = true,
}: {
  item: MenuItem;
  sizes: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { photoOf } = useCart();
  const photo = photoOf(item.id);
  if (photo) return <img src={photo} alt={item.name} loading="lazy" className={`item-img ${className}`} />;
  if (item.image) return <img {...img(item.image)} sizes={sizes} alt={item.name} loading="lazy" className={`item-img ${className}`} />;
  return (
    <div className={`item-placeholder ${className}`} role="img" aria-label={`${item.name} — photo coming soon`}>
      <svg viewBox="0 0 64 64" aria-hidden>
        <ellipse cx="32" cy="40" rx="26" ry="9" fill="currentColor" opacity=".12" />
        <path d="M14 36c0-10 8-18 18-18s18 8 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10 37h44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="32" cy="15" r="2.2" fill="currentColor" />
      </svg>
      {showLabel && <span>Photo coming soon</span>}
    </div>
  );
}
