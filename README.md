# Crescentia — Bakery Website

Next.js website for Crescentia, an artisan bakery in Dubai.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, address, opening hours, social links, footer links | `lib/site.ts` |
| Products (name, price, description, nutrition) | `lib/products.ts` |
| Blog posts | `lib/blog.ts` (add an object to publish a new post) |
| Colour palettes for the floating colour button | `lib/themes.ts` |
| About / Contact / Terms / Privacy text | `app/about`, `app/contact`, `app/terms`, `app/privacy` |
| Custom styles | `app/styles/site.css` (template styles are in `webflow.css`) |

## Project structure

```
app/                 pages (App Router)
  page.tsx           home
  menu/[slug]/       product pages
  blog/, blog/[slug] blog list + article pages
  about/ contact/ terms/ privacy/
  not-found.tsx      404 page
components/          shared UI (Navbar, Footer, colour switcher, forms…)
lib/                 site settings and content
public/images/       product & section images (WebP, several sizes each)
public/fonts/        Taviraj (headings) + Poppins (body), self-hosted
public/webflow/      Webflow animation runtime (scroll effects, sliders)
```

## Colour switcher

The round palette button (bottom-right) lets you try different colour schemes live.
The choice is saved in your browser only. Use **Copy colours** to copy the values; to make a palette the
permanent default, put its values in `themes[0]` in `lib/themes.ts`. To remove the button,
delete `<ThemeSwitcher />` from `app/layout.tsx`.

## Deploy on Vercel

1. Go to https://vercel.com/new and import the `Rajwara/Crescentia` GitHub repository.
2. Framework preset: **Next.js** (auto-detected). No settings or environment variables are required.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your final domain (e.g. `https://crescentia.ae`) for correct
   social-share links and sitemap.
4. Click **Deploy**. Every push to the production branch redeploys automatically.
