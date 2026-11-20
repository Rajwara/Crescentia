"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getItem, type MenuItem } from "@/lib/menu";

const STORAGE_KEY = "crescentia-cart";
const MAX_QTY = 50;

export type CartLine = { item: MenuItem; qty: number };

type CartContext = {
  lines: CartLine[];
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string, n?: number) => void;
  setQty: (id: string, qty: number) => void;
  /** Put the item in the cart (qty 1) unless it's already there. */
  ensure: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toast: { id: number; text: string } | null;
  /** Uploaded photo for an item (public/images/menu/<id>.*), if any. */
  photoOf: (id: string) => string | undefined;
};

const Ctx = createContext<CartContext | null>(null);

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}

/** Cart state shared by every page. Saved in the browser (localStorage) so it survives page loads. */
export default function CartProvider({
  children,
  photos = {},
}: {
  children: React.ReactNode;
  photos?: Record<string, string>;
}) {
  const [qty, setQtyMap] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<CartContext["toast"]>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const clean: Record<string, number> = {};
      for (const [id, n] of Object.entries(saved)) if (getItem(id) && Number(n) > 0) clean[id] = Math.min(MAX_QTY, Number(n));
      setQtyMap(clean);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qty));
    } catch {}
  }, [qty, loaded]);

  // Lock page scroll while the drawer is open; Esc closes it.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const showToast = useCallback((text: string) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const setQty = useCallback((id: string, n: number) => {
    setQtyMap((q) => {
      const next = { ...q };
      if (n <= 0) delete next[id];
      else next[id] = Math.min(MAX_QTY, n);
      return next;
    });
  }, []);

  const add = useCallback(
    (id: string, n = 1) => {
      const item = getItem(id);
      if (!item) return;
      setQtyMap((q) => ({ ...q, [id]: Math.min(MAX_QTY, (q[id] ?? 0) + n) }));
      showToast(`Added ${item.name}`);
    },
    [showToast]
  );

  const value = useMemo<CartContext>(() => {
    const lines = Object.entries(qty)
      .map(([id, n]) => ({ item: getItem(id)!, qty: n }))
      .filter((l) => l.item);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.item.price, 0),
      qtyOf: (id) => qty[id] ?? 0,
      add,
      setQty,
      ensure: (id) => getItem(id) && setQtyMap((q) => (q[id] ? q : { ...q, [id]: 1 })),
      clear: () => setQtyMap({}),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toast,
      photoOf: (id) => photos[id.toLowerCase()],
    };
  }, [qty, add, setQty, isOpen, toast, photos]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
