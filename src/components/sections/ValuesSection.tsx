import React from "react";

interface ValueItem {
  id: string;
  title: string;
  description: string;
}

const CORE_VALUES: ValueItem[] = [
  {
    id: "calm",
    title: "Calm Over Chaos",
    description:
      "We design easy-paced itineraries. No 6 AM wake-up calls every day. We prioritize depth of experience over rushing between spots.",
  },
  {
    id: "transparency",
    title: "Transparency",
    description:
      "What you see is what you pay. We are clear about inclusions, exclusions, and accommodation standards from day one.",
  },
  {
    id: "planning",
    title: "Planning",
    description:
      "We handle the logistics so you don't have to. From reliable vendors to backup plans, we value preparation over improvisation.",
  },
  {
    id: "community",
    title: "Community",
    description:
      "We keep groups small (max 26) to foster genuine connections. Strangers become friends by the second bonfire.",
  },
];

const ValuesSection: React.FC = () => {
  return (
    <section className="values-section">
      <div className="values-section__container">
        <header className="values-section__header">
          <h2 className="values-section__title">Our Core Values</h2>
          <p className="values-section__subtitle">
            The principles that guide every itinerary we plan.
          </p>
        </header>

        <div className="values-section__grid">
          {CORE_VALUES.map((value) => (
            <div key={value.id} className="value-card">
              <h3 className="value-card__title">{value.title}</h3>
              <p className="value-card__description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
