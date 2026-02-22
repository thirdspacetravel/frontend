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
  const lastUpdated = "January 15, 2024";

  const policyData: PolicySection[] = [
    {
      id: 1,
      title: "1. Introduction",
      content: [
        "At Third Space, we understand that plans can change unexpectedly. We strive to be as flexible and transparent as possible with our cancellation policies while respecting the commitments we make to our local partners, hotels, and transport providers.",
        "By booking a trip with Third Space, you agree to the terms outlined below. We recommend reading this policy carefully before confirming your reservation.",
      ],
    },
    {
      id: 2,
      title: "2. Cancellation Charges",
      content: [
        "If you need to cancel your trip, the following charges apply based on the total trip cost:",
      ],
      table: [
        {
          time: "30 days or more before departure",
          charge: "10% of trip cost (Processing Fee)",
        },
        { time: "15 to 29 days before departure", charge: "25% of trip cost" },
        { time: "7 to 14 days before departure", charge: "50% of trip cost" },
        {
          time: "Less than 7 days before departure",
          charge: "100% of trip cost (No Refund)",
        },
      ],
    },
    {
      id: 3,
      title: "3. Refund Process",
      content: [
        "Once confirmed, refunds are processed within 7-10 business days to the original payment method.",
      ],
      list: [
        "Banks may take additional time to reflect the amount on your statement.",
        "For UPI/Bank transfers, please email your details to speed up the process.",
        "Non-refundable booking fees (e.g., flight tickets) will be deducted from the final refund.",
      ],
    },
    {
      id: 4,
      title: "4. Rescheduling Policy",
      list: [
        "Free Rescheduling: Available if requested 21 days or more before departure.",
        "Late Rescheduling: Requests within 21 days are treated as a cancellation and re-booking.",
        "Fare differences may apply for peak season or price increases.",
      ],
    },
    {
      id: 5,
      title: "5. Trip Cancellation by Third Space",
      content: ["If we cancel due to group size or force majeure:"],
      list: [
        "You will receive a 100% refund.",
        "Alternatively, transfer your booking to a future trip at no extra fee.",
        "Third Space is not liable for personal expenses like independent flight tickets or visa fees.",
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
                    <strong>Phone:</strong> +91 98765 43210{" "}
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
