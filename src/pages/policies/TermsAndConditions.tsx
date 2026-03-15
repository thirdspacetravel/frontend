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
  const lastUpdated = "March 15, 2026";

  const termsData: TermsSection[] = [
    {
      id: 1,
      title: "1. Booking & Eligibility",
      content: [
        "By booking a trip with Third Space Travel, you confirm that you are at least 18 years old or are traveling with valid parental/guardian consent.",
        "Bookings are confirmed only after receipt of the required booking amount.",
      ],
    },
    {
      id: 2,
      title: "2. Payments",
      content: [
        "Trips require payment of full payment. Failure to complete payment may result in cancellation of the booking.",
      ],
    },
    {
      id: 3,
      title: "3. Group Travel Nature",
      content: [
        "Third Space Travel specializes in curated group experiences. Participants are expected to cooperate with trip captains and fellow travelers to maintain a safe and respectful environment.",
      ],
    },
    {
      id: 4,
      title: "4. Trip Itinerary",
      content: [
        "All itineraries are planned carefully; however, minor adjustments may occur due to weather, local conditions, safety considerations, or operational requirements.",
      ],
    },
    {
      id: 5,
      title: "5. Traveler Responsibility",
      subtitle: "Participants are responsible for:",
      list: [
        "Carrying valid identification",
        "Following safety guidelines",
        "Respecting local culture and regulations",
        "Maintaining respectful behavior with other travelers",
      ],
      content: [
        "Any behavior that threatens safety or group harmony may result in removal from the trip without refund.",
      ],
    },
    {
      id: 6,
      title: "6. Liability",
      content: [
        "Third Space Travel acts as a trip organizer and coordinator. While we work with verified transport providers, hotels, and local partners, we cannot be held responsible for circumstances beyond our control such as natural events, accidents, delays, or third-party service disruptions.",
      ],
    },
    {
      id: 7,
      title: "7. Acceptance",
      content: [
        "By booking a trip, travelers agree to abide by these Terms & Conditions and the related policies on this website.",
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
