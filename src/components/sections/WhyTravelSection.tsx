import React from "react";

const WHY_US_FEATURES = [
  {
    title: "4-Star Premium Stays",
    description:
      "Accommodation in carefully selected four-star properties ensuring professional hospitality, security, and a relaxed environment.",
  },
  {
    title: "Quality Buffet Meals",
    description:
      "Hygienic, top-quality breakfast and dinner served at the property to eliminate food stress and uncertainty.",
  },
  {
    title: "State-of-the-Art Urbania Tempo Traveller",
    description:
      "Superior seating comfort and spacious interiors for smooth long-distance rides starting right from Chandigarh.",
  },
  {
    title: "Curated Group Energy",
    description:
      "Fixed, structured group departures that ensure balanced sizes, organized coordination, and community without overcrowding.",
  },
  {
    title: "Safety & Security — Priority First",
    description:
      "Verified stays and trusted partners providing a secure environment for female solo travelers, students, and young professionals.",
  },
  {
    title: "Experiential & Mindful Travel",
    description:
      "Intentional pacing and balanced itineraries that allow for exploration and reflection rather than a rushed schedule.",
  },
  {
    title: "Clear & Transparent Pricing",
    description:
      "Full transparency with all inclusions, exclusions, and policies defined upfront—no hidden costs or surprises.",
  },
];

const WhyTravel: React.FC = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <header className="benefits__header">
          <h2 className="benefits__title">Why Travel With Us?</h2>
          <p className="benefits__subtitle">
            {`Thoughtfully designed group departures from Chandigarh — built on comfort, clarity, and security. We combine premium infrastructure with mindful travel design, so your trip feels organized, elevated, and meaningful — not rushed or chaotic.`}
          </p>
        </header>

        <div className="benefits__grid">
          {WHY_US_FEATURES.map((feature, index) => (
            <div key={index} className="benefit-card">
              <h3 className="benefit-card__title">{feature.title}</h3>
              <p className="benefit-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTravel;
