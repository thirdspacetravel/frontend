import React, { useState } from "react";
import ChevronDownIcon from "../../icons/ChevronDownIcon";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "Can I join solo?",
    answer:
      "Absolutely. About 40% of our travelers come solo. Our trips are designed to be social and inclusive.",
  },
  {
    id: 2,
    question: "What is the cancellation policy?",
    answer:
      "We offer a flexible cancellation policy. Cancel up to 7 days before departure for a refund (minus booking fees). Specifics vary by trip.",
  },
  {
    id: 3,
    question: "Are meals included?",
    answer:
      "Typically breakfast and dinner are included to keep logistics smooth, while lunch is kept flexible so you can explore local cafes.",
  },
  {
    id: 4,
    question: "Is alcohol allowed?",
    answer:
      "We follow a strict no-nuisance policy. Consumption is subject to local laws and hotel policies, but disruptive behavior is not tolerated.",
  },
];

const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-container__title">Common Questions</h2>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${activeIndex === index ? "faq-item--active" : ""}`}
            >
              <button
                className="faq-item__header"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="faq-item__question">{item.question}</span>
                <div className="faq-item__icon-wrapper">
                  <ChevronDownIcon className="faq-item__icon" />
                </div>
              </button>

              <div className="faq-item__content">
                <p className="faq-item__answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
