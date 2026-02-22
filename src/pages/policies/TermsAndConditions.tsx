import React from "react";

interface TermsSection {
  id: number;
  title: string;
  subtitle?: string;
  content?: string[];
  list?: string[];
  isContact?: boolean;
}

const TermsAndConditions: React.FC = () => {
  const lastUpdated = "January 15, 2024";

  const termsData: TermsSection[] = [
    {
      id: 1,
      title: "1. Introduction",
      content: [
        "Welcome to Third Space Travels. These Terms & Conditions govern your relationship with us when you book a trip or use our services. By booking a trip with Third Space, you agree to be bound by these terms.",
        "Our trips are designed to provide a structured, safe, and enjoyable experience. We value transparency and mutual respect.",
      ],
    },
    {
      id: 2,
      title: "2. Booking Policy",
      content: [
        "To secure a spot, a non-refundable deposit is required at the time of booking. The remaining balance must be paid 15 days prior to departure.",
      ],
      list: [
        "Bookings are confirmed only upon receipt of payment.",
        "Late balance payments may result in cancellation without refund.",
        "Valid identification (Aadhar, Passport) is mandatory.",
      ],
    },
    {
      id: 3,
      title: "3. Cancellations & Refunds",
      list: [
        "30+ Days: 90% refund (excl. deposit)",
        "15-29 Days: 50% refund",
        "0-14 Days: No refund",
      ],
      content: [
        "If Third Space cancels a trip due to unforeseen circumstances, a full refund or transfer will be offered.",
      ],
    },
    {
      id: 4,
      title: "4. Code of Conduct",
      content: [
        "We have a zero-tolerance policy for harassment or dangerous behavior. The Trip Captain reserves the right to remove participants for safety risks without refund.",
      ],
    },
    {
      id: 5,
      title: "5. Limitation of Liability",
      subtitle: "Third Space is not responsible for:",
      list: [
        "Personal injury or illness during the trip.",
        "Loss or damage to personal property.",
        "Itinerary changes due to weather or roadblocks.",
      ],
      content: [
        "We strongly recommend purchasing comprehensive travel insurance.",
      ],
    },
    {
      id: 6,
      title: "6. Contact Us",
      isContact: true,
      content: [
        "If you have questions or need to initiate a cancellation, contact us immediately:",
      ],
    },
  ];

  return (
    <section className="terms-page">
      <div className="policy-wrapper">
        <header className="policy-header">
          <h1>Terms & Conditions</h1>
          <div className="policy-meta">
            <span className="last-updated">Last updated: {lastUpdated}</span>
          </div>
        </header>

        <main className="policy-content">
          {termsData.map((section) => (
            <div
              key={section.id}
              className={`policy-section ${section.isContact ? "contact-box" : ""}`}
            >
              <h2>{section.title}</h2>

              {section.subtitle && (
                <p className="section-subtitle">
                  <strong>{section.subtitle}</strong>
                </p>
              )}

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

              {/* Specialized Contact UI */}
              {section.isContact && (
                <div className="contact-details">
                  <p>
                    <strong>Email:</strong> support@thirdspace.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 98765 43210{" "}
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

export default TermsAndConditions;
