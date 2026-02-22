import React from "react";

interface FactItem {
  id: string;
  label: string;
  value: string;
  iconType: "group" | "stay" | "transport" | "meals";
}

const QuickFacts: React.FC = () => {
  const facts: FactItem[] = [
    { id: "1", label: "Group Size", value: "Max 16 People", iconType: "group" },
    { id: "2", label: "Stay", value: "Premium Boutique", iconType: "stay" },
    {
      id: "3",
      label: "Transport",
      value: "Private Tempo",
      iconType: "transport",
    },
    { id: "4", label: "Meals", value: "Breakfast & Dinner", iconType: "meals" },
  ];

  return (
    <section className="quick-facts">
      <div className="quick-facts__container">
        {facts.map((fact) => (
          <div key={fact.id} className="quick-facts__item">
            <div className="quick-facts__icon-wrapper">
              <div className="quick-facts__icon"></div>
            </div>
            <div className="quick-facts__content">
              <span className="quick-facts__label">{fact.label}</span>
              <span className="quick-facts__value">{fact.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickFacts;
