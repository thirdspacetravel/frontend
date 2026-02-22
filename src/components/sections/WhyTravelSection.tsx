import React from 'react';

const WHY_US_FEATURES = [
  {
    title: "Fixed group size",
    description: "Curated, smaller groups so it never feels overcrowded or chaotic."
  },
  {
    title: "Verified stays & transport",
    description: "We only work with vetted hotels, homestays, and local transport partners."
  },
  {
    title: "Clear itineraries",
    description: "Transparent plans, policies, and expectations shared before you book."
  },
  {
    title: "On-ground coordinator",
    description: "A dedicated trip coordinator to handle logistics while you unwind."
  },
  {
    title: "Transparent inclusions",
    description: "No hidden costs — know exactly what’s included and what isn’t."
  }
];

const WhyTravel: React.FC = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <header className="benefits__header">
          <h2 className="benefits__title">Why Travel With Us?</h2>
          <p className="benefits__subtitle">
            Thoughtfully designed group trips with clarity, comfort, and care at the center.
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