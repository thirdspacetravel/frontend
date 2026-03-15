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
  const lastUpdated = "March 15, 2026";

  const safetyData: SafetySection[] = [
    {
      id: 1,
      title: "1. Traveler Safety",
      content: [
        "Safety is a priority at Third Space Travel. Every trip is led by a trained Trip Captain responsible for coordination, communication, and basic safety management.",
      ],
    },
    {
      id: 2,
      title: "2. Traveler Responsibility",
      content: ["To ensure a smooth experience, travelers must:"],
      list: [
        "Follow instructions from trip captains",
        "Avoid risky or reckless behavior",
        "Inform organizers of any medical conditions before the trip",
      ],
      highlight: {
        label: "Safety Warning:",
        text: "Any behavior that threatens safety or group harmony may result in removal from the trip without refund.",
      },
    },
    {
      id: 3,
      title: "3. Personal Belongings",
      content: [
        "Participants are responsible for their personal belongings, valuables, and travel documents.",
        "Third Space Travel is not liable for lost, stolen, or damaged items.",
      ],
    },
    {
      id: 4,
      title: "4. Adventure Activities",
      content: [
        "Certain trips may include activities such as trekking, camping, or outdoor experiences.",
      ],
      highlight: {
        label: "Voluntary Risk:",
        text: "Participation in such activities is voluntary and done at the traveler’s own risk.",
      },
    },
    {
      id: 5,
      title: "5. Third-Party Services",
      content: [
        "Transportation, accommodation, and local services are provided by verified third-party vendors.",
        "While we work with trusted partners, we cannot be held liable for their actions or service disruptions.",
      ],
    },
    {
      id: 6,
      title: "6. Emergency Situations",
      content: [
        "In case of emergencies, the Trip Captain will coordinate assistance and contact local authorities if required.",
      ],
      highlight: {
        label: "Recommendation:",
        text: "Travelers are encouraged to carry basic travel insurance where applicable.",
      },
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

export default SafetyPolicy;
