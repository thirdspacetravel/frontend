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
  const lastUpdated = "January 15, 2024";

  const privacyData: PrivacySection[] = [
    {
      id: 1,
      title: "1. Introduction",
      content: [
        "At Third Space, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website, enquire about our trips, or book a travel experience with us.",
        "We are committed to ensuring that your data is handled transparently and securely, in compliance with applicable data protection laws.",
      ],
    },
    {
      id: 2,
      title: "2. Information We Collect",
      content: [
        "We collect information to provide better services to all our travelers. The types of information we collect include:",
      ],
      list: [
        "Personal Information: Name, email address, phone number, government ID proof (for bookings), and emergency contact details.",
        "Trip Preferences: Destination interests, dietary restrictions, and special requests.",
        "Technical Data: IP address, browser type, and device information when you visit our website.",
      ],
    },
    {
      id: 3,
      title: "3. How We Use Your Information",
      content: [
        "Your data is used solely to facilitate your travel experience and improve our services. Specifically, we use it to:",
      ],
      list: [
        "Process bookings and send itinerary confirmations.",
        "Communicate important trip updates, weather alerts, or schedule changes.",
        "Coordinate with hotel and transport partners to ensure smooth operations.",
        "Respond to your enquiries via WhatsApp or email.",
        "Improve our website functionality and user experience.",
      ],
    },
    {
      id: 4,
      title: "4. Sharing of Information",
      content: [
        "We do not sell, trade, or rent your personal identification information to others. However, we may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.",
        "We may share your information with:",
      ],
      list: [
        "Service Providers: Hotels, transport operators, and activity guides strictly for the purpose of fulfilling your booking.",
        "Legal Authorities: If required by law or to protect our rights and safety.",
      ],
    },
    {
      id: 5,
      title: "5. Data Security",
      content: [
        "We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.",
      ],
      note: {
        label: "Security Standard:",
        text: "All sensitive data exchange between the site and its users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.",
      },
    },
    {
      id: 6,
      title: "6. Your Rights",
      content: [
        "You have the right to request access to the personal information we hold about you. You may also request corrections to any inaccurate data or ask for your data to be deleted from our records, subject to legal retention requirements.",
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
                    <strong>Phone:</strong> +91 98765 43210
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
