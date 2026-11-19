import type { Metadata } from "next";
import OrderForm from "@/components/OrderForm";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-Order",
  description: `Reserve ${site.name} sourdough and pastries ahead of time for guaranteed availability.`,
};

export default function PreOrderPage() {
  return (
    <PageShell
      current="/pre-order"
      eyebrow="Reserve a Limited Batch"
      title="Pre-Order"
      lead="Our signature bakes sell out early. Reserve yours at least a day ahead and we’ll have it waiting."
    >
      <div className="info-row">
        <div>
          <div className="page-eyebrow">Guaranteed</div>
          <p>Pre-orders are set aside from the morning bake, so they’re always available.</p>
        </div>
        <div>
          <div className="page-eyebrow">Notice</div>
          <p>Order by 6 PM the day before. Larger and event orders need 48 hours.</p>
        </div>
        <div>
          <div className="page-eyebrow">Changes</div>
          <p>
            Cancel or change up to 24 hours before pickup. See our <a href="/terms">terms</a>.
          </p>
        </div>
      </div>
      <OrderForm mode="preorder" />
    </PageShell>
  );
}
