import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Photos uploaded to /public/images/menu/<item-id>.(jpg|jpeg|png|webp), keyed by item id.
 * Read at build time, so adding a photo just needs a push / redeploy.
 */
export function getMenuPhotos(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "images", "menu");
  const photos: Record<string, string> = {};
  try {
    for (const file of fs.readdirSync(dir)) {
      const m = file.match(/^(.+)\.(jpe?g|png|webp|avif)$/i);
      if (m) photos[m[1].toLowerCase()] = `/images/menu/${file}`;
    }
  } catch {}
  return photos;
}
