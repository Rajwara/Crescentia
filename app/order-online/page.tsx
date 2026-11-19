import type { Metadata } from "next";
import OrderForm from "@/components/OrderForm";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Online",
  description: `Order fresh bread and pastries from ${site.name} for same-day pickup or delivery in ${site.address.city}.`,
};

export default function OrderOnlinePage() {
  return (
    <PageShell
      current="/order-online"
      eyebrow="Fresh Today"
      title="Order Online"
      lead="Choose your bakes for same-day pickup from our café, or delivery in eco-packaging."
    >
      <div className="info-row">
        <div>
          <div className="page-eyebrow">Pick Up</div>
          <p>Visit our café-style storefront. Fast check-out with a QR code scan.</p>
        </div>
        <div>
          <div className="page-eyebrow">Local Delivery</div>
          <p>Same-day delivery, 10 AM – 5 PM drop windows. {site.deliveryArea}.</p>
        </div>
        <div>
          <div className="page-eyebrow">Need it another day?</div>
          <p>
            Reserve ahead with a <a href="/pre-order">pre-order</a> to guarantee availability.
          </p>
        </div>
      </div>
      <OrderForm mode="order" />
    </PageShell>
  );
}
