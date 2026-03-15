import React from "react";

interface PolicySection {
  id: number;
  title: string;
  content?: string[]; // For paragraphs
  list?: string[]; // For bullet points
  table?: { time: string; charge: string }[];
  isContact?: boolean;
}

const CancellationPolicy: React.FC = () => {
  const lastUpdated = "March 15, 2026";

  const policyData: PolicySection[] = [
    {
      id: 1,
      title: "1. Traveler Cancellations",
      content: [
        "If a traveler cancels their booking, the following policy applies:",
      ],
      table: [
        {
          time: "More than 15 days before departure",
          charge: "Partial refund after deducting booking amount",
        },
        {
          time: "10 days before departure",
          charge: "50% refund",
        },
        {
          time: "Less than 7 days before departure",
          charge: "No refund",
        },
      ],
      list: [
        "Actual refund timelines may vary depending on payment gateways and processing times.",
      ],
    },
    {
      id: 2,
      title: "2. Non-Refundable Items",
      content: [
        "Certain expenses such as permits, advance hotel bookings, or transportation reservations may be non-refundable.",
      ],
    },
    {
      id: 3,
      title: "3. No-Show",
      content: [
        "If a traveler fails to report at the designated pickup point or time, it will be treated as a no-show, and no refund will be issued.",
      ],
    },
    {
      id: 4,
      title: "4. Trip Cancellation by Organizer",
      content: [
        "If Third Space Travel cancels a trip due to insufficient participants, safety concerns, or operational reasons, travelers will be offered either:",
      ],
      list: [
        "A full refund, or",
        "The option to transfer the booking to another trip/date.",
      ],
    },
    {
      id: 5,
      title: "5. Force Majeure",
      content: [
        "No refunds will be guaranteed for cancellations caused by natural disasters, government restrictions, strikes, or other circumstances beyond our control, though we will attempt to provide reasonable alternatives whenever possible.",
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
    <section className="cancellation-page">
      <div className="policy-wrapper">
        <header className="policy-header">
          <h1>Cancellation & Refund Policy</h1>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </header>

        <main className="policy-content">
          {policyData.map((section) => (
            <div
              key={section.id}
              className={`policy-section ${section.isContact ? "contact-box" : ""}`}
            >
              <h2>{section.title}</h2>

              {/* Render Paragraphs */}
              {section.content?.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}

              {/* Render Table if exists */}
              {section.table && (
                <div className="table-container">
                  <table className="cancellation-table">
                    <thead>
                      <tr>
                        <th>Time of Cancellation</th>
                        <th>Cancellation Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.time}</td>
                          <td>{row.charge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Render Lists if exists */}
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
                    <strong>Phone:</strong> +91 77197 83377{" "}
                    <small>(Mon-Sat, 10 AM - 7 PM)</small>
                  </p>
                </div>
              )}

              {/* Conditional Footer Note for Section 2 */}
              {section.id === 2 && (
                <div className="note">
                  <strong>Note:</strong> For peak season bookings (December 20 -
                  January 5) or specialized institutional trips, cancellation
                  terms may vary.
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default CancellationPolicy;
