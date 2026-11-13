import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

const UPDATED = "13 November 2026";

export default function TermsPage() {
  return (
    <PageShell current="/terms" narrow eyebrow={`Last updated ${UPDATED}`} title="Terms & Conditions">
      <div className="prose">
        <p>
          These Terms &amp; Conditions govern your use of the {site.name} website and any orders you place with us for
          pickup or delivery. By using this website or placing an order, you agree to these terms.
        </p>

        <h2>1. About Us</h2>
        <p>
          {site.name} is a bakery located at {fullAddress}. You can reach us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
        </p>

        <h2>2. Products &amp; Availability</h2>
        <p>
          Our products are baked fresh in small batches and are subject to availability. Images are for illustration;
          as handmade goods, each item may vary slightly in size, shape and appearance. We may change our menu, recipes
          and prices at any time without notice.
        </p>

        <h2>3. Orders &amp; Pre-Orders</h2>
        <ul>
          <li>An order is confirmed only once we have acknowledged it by message, email or phone.</li>
          <li>Pre-orders must be placed by the cut-off time we communicate for the chosen pickup or delivery day.</li>
          <li>We may decline or cancel an order, for example if an item is unavailable, and will refund any amount paid.</li>
        </ul>

        <h2>4. Prices &amp; Payment</h2>
        <p>
          All prices are shown in UAE Dirhams (AED) and include VAT where applicable. Payment is due at the time of
          ordering or on collection, as agreed when your order is confirmed.
        </p>

        <h2>5. Pickup &amp; Delivery</h2>
        <ul>
          <li>Pickup orders should be collected within the agreed time window. Uncollected items may not be held over.</li>
          <li>
            Same-day delivery is available within our delivery area and time windows. Please make sure someone is
            available to receive the order.
          </li>
          <li>Delivery times are estimates and may be affected by traffic, weather or other events beyond our control.</li>
        </ul>

        <h2>6. Cancellations &amp; Refunds</h2>
        <p>
          Because our products are perishable and made to order, cancellations must be made at least 24 hours before
          the scheduled pickup or delivery time. If an item is damaged or incorrect, please contact us on the same day
          with your order details and a photo, and we will offer a replacement or refund.
        </p>

        <h2>7. Allergens</h2>
        <p>
          Our kitchen handles gluten, dairy, eggs, nuts, soy and sesame. Although we list known allergens for each
          product, we cannot guarantee that any item is free from traces of allergens. Please tell us about any
          allergies before ordering.
        </p>

        <h2>8. Website Use &amp; Content</h2>
        <p>
          All text, photographs, logos and designs on this website belong to {site.name} or its licensors and may not
          be copied or reused without our written permission. You agree not to misuse the website or interfere with
          its normal operation.
        </p>

        <h2>9. Liability</h2>
        <p>
          To the extent permitted by law, {site.name} is not liable for indirect or consequential losses arising from
          the use of this website or our products. Nothing in these terms limits any rights you have under UAE consumer
          protection law.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab
          Emirates. Any disputes are subject to the jurisdiction of the courts of Dubai.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these terms from time to time. The latest version will always be published on this page with
          its “last updated” date.
        </p>
      </div>
    </PageShell>
  );
}
