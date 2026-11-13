import manifest from "./images.json";

export type ImageName = Exclude<keyof typeof manifest, "_fonts">;

/**
 * Responsive src / srcSet for an image in /public/images (generated as name-<width>.webp).
 * Width/height are deliberately not returned: the Webflow CSS sizes images itself.
 */
export function img(name: ImageName) {
  const { widths } = manifest[name];
  return {
    src: `/images/${name}-${widths[widths.length - 1]}.webp`,
    srcSet: widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", "),
  };
}

export const ARROW = "/icons/arrow-right.svg";
export const STAR = "/icons/star.svg";
