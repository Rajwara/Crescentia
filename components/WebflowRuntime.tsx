"use client";

import { useEffect } from "react";

/**
 * Loads the Webflow animation runtime (scroll effects, sliders, cursors) after React
 * has hydrated, so Webflow's DOM changes never clash with hydration.
 *
 * Internal links use plain <a> tags (full page loads) so Webflow re-initialises
 * cleanly on every page.
 */
const SHARED = ["/webflow/jquery-3.5.1.min.js", "/webflow/webflow-chunk-1.js", "/webflow/webflow-chunk-2.js"];

export type WebflowPage = "home" | "product" | "notFound";

const PAGES: Record<WebflowPage, { id: string; script: string }> = {
  home: { id: "68a7c4886ce86843e8cb6f4f", script: "/webflow/webflow-home.js" },
  product: { id: "68ac03b263058d92e8b564ba", script: "/webflow/webflow-pages.js" },
  notFound: { id: "68ad085fc8e19135fc8f645c", script: "/webflow/webflow-pages.js" },
};

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export default function WebflowRuntime({ page }: { page: WebflowPage }) {
  useEffect(() => {
    const w = window as unknown as { __wfLoaded?: boolean };
    if (w.__wfLoaded) return; // React Strict Mode runs effects twice in dev
    w.__wfLoaded = true;
    document.documentElement.setAttribute("data-wf-page", PAGES[page].id);
    (async () => {
      for (const src of [...SHARED, PAGES[page].script]) await loadScript(src);
      // The browser "load" event has already fired by now, so tell Webflow's IX2 engine the page
      // is ready — this starts the page-load animations (hero headline, croissant, etc.).
      setTimeout(() => document.dispatchEvent(new Event("IX2_PAGE_UPDATE")), 50);
    })().catch((e) => console.error(e));
  }, [page]);
  return null;
}
