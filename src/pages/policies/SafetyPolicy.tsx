import React from "react";

interface SafetySection {
  id: number;
  title: string;
  content?: string[];
  list?: string[];
  highlight?: {
    label: string;
    text: string;
  };
  isContact?: boolean;
}

const SafetyPolicy: React.FC = () => {
  const lastUpdated = "January 15, 2024";

  const safetyData: SafetySection[] = [
    {
      id: 1,
      title: "1. Our Commitment to Safety",
      content: [
        "Your safety is our priority. Third Space diligently selects partners, accommodations, and transport providers that meet our safety standards. However, travel—especially to remote or natural destinations—carries inherent risks that cannot be entirely eliminated.",
        "This policy outlines the responsibilities shared between Third Space (the Organizer) and you (the Participant) to ensure a safe and enjoyable experience.",
      ],
    },
    {
      id: 2,
      title: "2. Assumption of Risk",
      content: ["By booking a trip with Third Space, you acknowledge that:"],
      list: [
        "Travel involves risks including, but not limited to, accidents, illness, political instability, and forces of nature.",
        "Medical facilities in remote areas may be limited or difficult to access.",
        "Participation in activities like trekking, camping, or water sports is voluntary and undertaken at your own risk.",
      ],
    },
    {
      id: 3,
      title: "3. Medical & Health Requirements",
      content: [
        "Participants must ensure they are medically fit to travel. It is your responsibility to:",
      ],
      list: [
        "Inform us of any pre-existing medical conditions, allergies, or dietary restrictions at the time of booking.",
        "Carry necessary personal medication for the duration of the trip.",
        "Adhere to health guidelines and vaccinations required for the destination.",
      ],
      highlight: {
        label: "Insurance:",
        text: "We strongly recommend that all participants purchase comprehensive travel insurance that covers medical emergencies, evacuation, and trip cancellations.",
      },
    },
    {
      id: 4,
      title: "4. Code of Conduct",
      content: [
        "To maintain a safe and respectful environment for all, participants are expected to:",
      ],
      list: [
        "Follow the instructions and timeline set by the Trip Coordinator or Guide at all times.",
        "Respect local customs, culture, and environmental regulations (Leave No Trace).",
        "Avoid behavior that endangers the safety or well-being of themselves or others.",
      ],
      highlight: {
        label: "Zero Tolerance:",
        text: "Third Space reserves the right to terminate the trip for any participant found possessing illegal substances, engaging in harassment, or consistently disrupting the group. No refunds will be provided in such cases.",
      },
    },
    {
      id: 5,
      title: "5. Liability Disclaimer",
      content: [
        "Third Space acts as an aggregator and facilitator. We are not liable for:",
      ],
      list: [
        "Delays, changes, or cancellations caused by weather, strikes, or operational issues beyond our control.",
        "Loss, theft, or damage to personal belongings (electronics, cash, luggage).",
        "Injuries or accidents resulting from participant negligence or failure to follow instructions.",
      ],
    },
    {
      id: 6,
      title: "6. Emergency Protocol",
      content: [
        "In the event of an emergency, our Trip Coordinators are trained to:",
      ],
      list: [
        "Contact local emergency services and the nearest medical facility immediately.",
        "Inform the participant's emergency contact person designated during booking.",
        "Facilitate evacuation or support as reasonably possible.",
      ],
    },
    {
      id: 7,
      title: "7. Contact for Safety Concerns",
      isContact: true,
      content: [
        "For immediate assistance or to report safety concerns during your trip, reach out to our safety desk:",
      ],
    },
  ];

  return (
    <section className="safety-policy-page">
      <div className="policy-wrapper">
        <header className="policy-header">
          <h1>Safety & Liability Policy</h1>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </header>

        <main className="policy-content">
          {safetyData.map((section) => (
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

              {section.highlight && (
                <div className="note">
                  <strong>{section.highlight.label}</strong>{" "}
                  {section.highlight.text}
                </div>
              )}

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

export default SafetyPolicy;
