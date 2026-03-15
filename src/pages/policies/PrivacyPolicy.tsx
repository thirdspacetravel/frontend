import React from "react";

interface PrivacySection {
  id: number;
  title: string;
  content?: string[];
  list?: string[];
  note?: {
    label: string;
    text: string;
  };
  isContact?: boolean;
}

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "March 15, 2026";

  const privacyData: PrivacySection[] = [
    {
      id: 1,
      title: "1. Information We Collect",
      content: [
        "We collect basic information necessary to manage your travel requirements. This information is used solely to manage bookings and improve travel experiences.",
      ],
      list: [
        "Name",
        "Contact details",
        "Email address",
        "Payment information",
        "Travel preferences",
      ],
    },
    {
      id: 2,
      title: "2. Use of Information",
      content: [
        "Your information may be used to ensure a seamless trip experience. Specifically, we use your data to:",
      ],
      list: [
        "Process bookings and payments",
        "Communicate trip updates",
        "Provide customer support",
        "Send relevant travel updates or offers",
      ],
    },
    {
      id: 3,
      title: "3. Data Protection",
      content: [
        "We take reasonable measures to protect personal data and ensure that sensitive information is handled securely.",
      ],
    },
    {
      id: 4,
      title: "4. Third-Party Sharing",
      content: [
        "Your information may be shared only when necessary with transport providers, hotels, or service partners for operational purposes.",
      ],
      note: {
        label: "Marketing Guarantee:",
        text: "We do not sell or distribute personal data to external marketing agencies.",
      },
    },
    {
      id: 5,
      title: "5. Cookies & Website Usage",
      content: [
        "Our website may use cookies to improve functionality, track performance, and enhance the user experience.",
      ],
    },
    {
      id: 6,
      title: "6. Consent",
      content: [
        "By using our website or booking a trip with Third Space Travel, you consent to this Privacy Policy.",
      ],
    },
    {
      id: 7,
      title: "7. Contact Us",
      isContact: true,
      content: [
        "If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:",
      ],
    },
  ];
  return (
    <section className="privacy-policy-page">
      <div className="policy-wrapper">
        <header className="policy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </header>

        <main className="policy-content">
          {privacyData.map((section) => (
            <div
              key={section.id}
              className={`policy-section ${section.isContact ? "contact-box" : ""}`}
            >
              <h2>{section.title}</h2>

              {section.content?.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}

              {section.list && (
                <ul className="policy-list">
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {section.note && (
                <div className="note">
                  <strong>{section.note.label}</strong> {section.note.text}
                </div>
              )}

              {section.isContact && (
                <div className="contact-details">
                  <p>
                    <strong>Privacy Desk:</strong> privacy@thirdspace.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 77197 83377{" "}
                    <small>(Mon-Sat, 10 AM - 7 PM)</small>
                  </p>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
