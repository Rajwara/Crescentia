import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description: `Breakfast, brunch, lunch and dinner at ${site.name}, ${site.address.city}. Order online or pre-order for later.`,
};

export default function MenuPage() {
  return (
    <PageShell
      current="/menu"
      eyebrow="Breakfast to Dinner"
      title="Our Menu"
      lead="Everything we bake and cook, from the first croissant of the morning to dinner by the oven. Add dishes to your cart to order for today or pre-order for later."
    >
      <MenuBrowser />
    </PageShell>
  );
}
