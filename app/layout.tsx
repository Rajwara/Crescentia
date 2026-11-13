import type { Metadata, Viewport } from "next";
import "./styles/fonts.css";
import "./styles/webflow.css";
import "./styles/site.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/themes";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Artisan Bakery in Dubai`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Artisan Bakery in Dubai`,
    description: site.description,
    images: ["/images/og-image.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

// Adds Webflow's "w-mod-js" / "w-mod-touch" classes before paint (needed by its animations).
const wfModScript = `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-wf-site="68a7c4876ce86843e8cb6f41" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: wfModScript + themeInitScript }} />
      </head>
      <body className="body">
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
