import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

const UPDATED = "13 November 2026";

export default function PrivacyPage() {
  return (
    <PageShell current="/privacy" narrow eyebrow={`Last updated ${UPDATED}`} title="Privacy Policy">
      <div className="prose">
        <p>
          {site.name} (“we”, “us”) respects your privacy. This policy explains what personal data we collect when you
          visit our website, contact us or place an order, and how we use and protect it, in line with the UAE Federal
          Decree-Law No. 45 of 2021 on the Protection of Personal Data.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Information you give us:</strong> your name, email address, phone number, delivery address and
            order details when you contact us, subscribe to The Journal or place an order.
          </li>
          <li>
            <strong>Information collected automatically:</strong> basic technical data such as browser type, device
            and pages visited, collected by our hosting provider to keep the website secure and working.
          </li>
          <li>
            <strong>Preferences stored on your device:</strong> if you use the colour switcher, your chosen colours are
            saved in your browser’s local storage only and are never sent to us.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To take, prepare, deliver and follow up on your orders.</li>
          <li>To reply to your messages and enquiries.</li>
          <li>To send The Journal and offers, only if you have subscribed — you can unsubscribe at any time.</li>
          <li>To keep our website secure and improve our service.</li>
          <li>To meet our legal and accounting obligations.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>
          We do not sell your personal data. We share it only with service providers who help us run the bakery — such
          as delivery partners, payment providers, email services and our website host — and only as needed to provide
          their services, or where required by law.
        </p>

        <h2>4. How Long We Keep It</h2>
        <p>
          We keep personal data only as long as needed for the purposes above, or as required by law (for example,
          financial records), after which it is securely deleted.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You can ask us to access, correct or delete your personal data, to restrict or object to its use, or to stop
          sending you marketing messages. To make a request, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>6. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect your data. No method of transmission over
          the internet is completely secure, but we work to protect your information.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          Our website links to social media and map services. Their own privacy policies apply when you visit them.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          {site.name}, {fullAddress}
          <br />
          Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Phone: {site.phone}
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
      </div>
    </PageShell>
  );
}
