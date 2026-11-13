/**
 * Colour palettes for the floating colour switcher.
 *  - base:   page background
 *  - ink:    main text colour (also the footer background)
 *  - onInk:  text colour used on top of `ink` (footer text)
 *  - accent: highlight colour
 *  - glow:   hue shift (degrees) applied to the soft warm glow images behind products
 *
 * To make a palette the permanent default, copy its values into `defaultTheme`.
 */
export type Theme = { name: string; base: string; ink: string; onInk: string; accent: string; glow: number };

export const themes: Theme[] = [
  { name: "Original", base: "#e9e3d5", ink: "#080808", onInk: "#ffffff", accent: "#3e000c", glow: 0 },
  { name: "Ivory & Espresso", base: "#f6f1e9", ink: "#2b1d14", onInk: "#f6f1e9", accent: "#8a5a35", glow: 0 },
  { name: "Desert Rose", base: "#f3e3dd", ink: "#2a1418", onInk: "#f3e3dd", accent: "#b4566a", glow: -25 },
  { name: "Saffron", base: "#f7ebcf", ink: "#24190a", onInk: "#f7ebcf", accent: "#c27b12", glow: 10 },
  { name: "Pistachio", base: "#e6eadb", ink: "#1d2a20", onInk: "#e6eadb", accent: "#4f6b4a", glow: 60 },
  { name: "Marina", base: "#e2eaee", ink: "#0d1f2a", onInk: "#e2eaee", accent: "#1f6f8b", glow: 170 },
  { name: "Lavender", base: "#ebe6f2", ink: "#1f1830", onInk: "#ebe6f2", accent: "#6a4fa3", glow: 230 },
  { name: "Night Bakery", base: "#17120f", ink: "#f3ead8", onInk: "#17120f", accent: "#d9a35f", glow: 0 },
];

export const defaultTheme = themes[0];
export const THEME_STORAGE_KEY = "crescentia-theme";

/** CSS variables (from the Webflow design system) that each palette sets. */
export function themeVars(t: Theme): Record<string, string> {
  const mix = (a: string, b: string, pct: number) => `color-mix(in srgb, ${a} ${pct}%, ${b})`;
  return {
    "--base-color--b-100": t.base,
    "--neutral-color--n-500": t.ink,
    "--neutral-color--n-400": mix(t.ink, t.base, 58),
    "--neutral-color--n-300": mix(t.ink, t.base, 30),
    "--neutral-color--n-200": mix(t.ink, t.base, 10),
    "--neutral-color--n-100": t.onInk,
    "--primary-color--p-500": t.accent,
    "--primary-color--p-400": mix(t.accent, t.base, 80),
    "--primary-color--p-300": mix(t.accent, t.base, 60),
    "--primary-color--p-200": mix(t.accent, t.base, 40),
    "--primary-color--p-100": mix(t.accent, t.base, 20),
    "--theme-glow": `${t.glow}deg`,
  };
}

/** Inline script run before first paint so a saved palette applies without a flash. */
export const themeInitScript = `(function(){try{var t=JSON.parse(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)})||"null");if(!t||!t.vars)return;var s=document.documentElement.style;for(var k in t.vars)s.setProperty(k,t.vars[k]);}catch(e){}})();`;
