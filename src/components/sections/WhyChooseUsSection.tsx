import React from "react";
import DocumentIcon from "../../icons/DocumentIcon";
import SecurityIcon from "../../icons/SecurityIcon";
import UsersIcon from "../../icons/UsersIcon";
import DollarMoneyIcon from "../../icons/DollarMoneyIcon";

interface FeatureItem {
  title: string;
  description: string;
  details: string[]; // Added this for the list items
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Structured Documentation",
    description:
      "Full administrative support for seamless institutional approvals.",
    details: [
      "GST invoices & detailed quotations",
      "Official contracts & inclusion lists",
      "Institutional compliance paperwork",
      "Risk disclaimers & safety waivers",
    ],
    icon: <DocumentIcon />,
  },
  {
    title: "Safety-First Approach",
    description:
      "Zero-compromise safety protocols for every student departure.",
    details: [
      "Verified 4-star stays & premium Urbania",
      "Dedicated trip captain & 24/7 support",
      "Strict female safety protocols",
      "GPS-monitored movement tracking",
    ],
    icon: <SecurityIcon />,
  },
  {
    title: "Faculty Coordination",
    description: "Tailored logistics to respect faculty roles and comfort.",
    details: [
      "Separate faculty rooms & special meals",
      "Dedicated coordination point of contact",
      "Detailed pre-trip briefing calls",
      "Priority faculty assistance on-ground",
    ],
    icon: <UsersIcon />,
  },
  {
    title: "Transparent Costing",
    description:
      "Honest, fixed pricing with no surprises for the accounts team.",
    details: [
      "Clear per-student cost breakdown",
      "Defined inclusion & exclusion clarity",
      "Strict no-hidden-cost policy",
      "Structured payment & refund timelines",
    ],
    icon: <DollarMoneyIcon />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-section__wrapper">
        <header className="benefits-section__header">
          <h2 className="benefits-section__title">
            Why Institutions Choose Us
          </h2>
          <div className="benefits-section__divider"></div>
        </header>

        <div className="benefits-section__grid">
          {FEATURES.map((feature, index) => (
            <div key={index.toString()} className="feature-card">
              <div className="feature-card__icon-bg">{feature.icon}</div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">
                  {feature.description}
                </p>
                <ul className="feature-card__list">
                  {feature.details.map((item, index) => (
                    <li key={index} className="feature-card__list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
