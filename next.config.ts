import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old static-export URLs (e.g. /menu/heritage-sourdough.html) keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu/:slug.html", destination: "/menu/:slug", permanent: true },
      { source: "/:page(license|style-guide|changelog)(.html)?", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
