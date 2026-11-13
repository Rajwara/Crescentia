"use client";

import { useEffect, useState } from "react";
import { defaultTheme, THEME_STORAGE_KEY, themes, themeVars, type Theme } from "@/lib/themes";

function apply(t: Theme) {
  const vars = themeVars(t);
  const s = document.documentElement.style;
  for (const [k, v] of Object.entries(vars)) s.setProperty(k, v);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ theme: t, vars }));
  } catch {}
}

/** Floating button (bottom-right) to try different colour palettes. Choice is saved per browser. */
export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "null");
      if (saved?.theme) setTheme(saved.theme);
    } catch {}
  }, []);

  const update = (t: Theme) => {
    setTheme(t);
    apply(t);
    setCopied(false);
  };
  const set = (patch: Partial<Theme>) => update({ ...theme, ...patch, name: "Custom" });

  const reset = () => {
    const s = document.documentElement.style;
    for (const k of Object.keys(themeVars(defaultTheme))) s.removeProperty(k);
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {}
    setTheme(defaultTheme);
  };

  const copy = async () => {
    const { name, ...rest } = theme;
    const text = `Crescentia palette "${name}": ${JSON.stringify(rest)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.prompt("Copy these colours:", text);
    }
  };

  return (
    <div className={`theme-switcher${open ? " is-open" : ""}`}>
      {open && (
        <div className="theme-panel" role="dialog" aria-label="Colour palettes">
          <div className="theme-panel-head">
            <span>Colour palette</span>
            <button type="button" className="theme-close" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>

          <div className="theme-presets">
            {themes.map((t) => (
              <button
                key={t.name}
                type="button"
                className={`theme-preset${theme.name === t.name ? " is-active" : ""}`}
                onClick={() => update(t)}
                title={t.name}
              >
                <span className="theme-dots">
                  <i style={{ background: t.base }} />
                  <i style={{ background: t.ink }} />
                  <i style={{ background: t.accent }} />
                </span>
                <span className="theme-preset-name">{t.name}</span>
              </button>
            ))}
          </div>

          <div className="theme-custom">
            <label>
              <input type="color" value={theme.base} onChange={(e) => set({ base: e.target.value })} />
              Background
            </label>
            <label>
              <input type="color" value={theme.ink} onChange={(e) => set({ ink: e.target.value })} />
              Text &amp; footer
            </label>
            <label>
              <input type="color" value={theme.onInk} onChange={(e) => set({ onInk: e.target.value })} />
              Footer text
            </label>
            <label>
              <input type="color" value={theme.accent} onChange={(e) => set({ accent: e.target.value })} />
              Accent
            </label>
            <label className="theme-range">
              Glow tint
              <input
                type="range"
                min={-180}
                max={180}
                value={theme.glow}
                onChange={(e) => set({ glow: Number(e.target.value) })}
              />
            </label>
          </div>

          <div className="theme-actions">
            <button type="button" onClick={reset}>
              Reset
            </button>
            <button type="button" onClick={copy}>
              {copied ? "Copied ✓" : "Copy colours"}
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="theme-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change colours"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" />
          <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
          <circle cx="10" cy="7" r="1.2" fill="currentColor" />
          <circle cx="15" cy="7" r="1.2" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
