import React from "react";
import DocumentIcon from "../../icons/DocumentIcon";
import SecurityIcon from "../../icons/SecurityIcon";
import UsersIcon from "../../icons/UsersIcon";
import DollarMoneyIcon from "../../icons/DollarMoneyIcon";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Structured Documentation",
    description:
      "We handle all GST invoices, permissions, and compliance paperwork required by institutions.",
    icon: <DocumentIcon />,
  },
  {
    id: 2,
    title: "Safety-First Approach",
    description:
      "Verified transport, safe hotels, and a dedicated trip captain for 24/7 on-ground support.",
    icon: <SecurityIcon />,
  },
  {
    id: 3,
    title: "Faculty Coordination",
    description:
      "Special arrangements for faculty members, ensuring their comfort and oversight capability.",
    icon: <UsersIcon />,
  },
  {
    id: 4,
    title: "Transparent Costing",
    description:
      "No hidden costs. Clear per-student pricing with detailed inclusion lists for approvals.",
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
        </header>

        <div className="benefits-section__grid">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card__icon-bg">{feature.icon}</div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
