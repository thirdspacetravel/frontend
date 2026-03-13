import React from "react";
import Button from "../utils/Button";
import { useNavigate } from "react-router";
interface SpaceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ title, description, icon }) => (
  <article className="space-card">
    <div className="space-card__icon-box">{icon}</div>
    <div className="space-card__content">
      <h3 className="space-card__title">{title}</h3>
      <p className="space-card__description">{description}</p>
    </div>
  </article>
);

// --- Main Component ---
const WhatIsThirdSpace: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="third-space">
      <div className="third-space__container">
        <header className="third-space__header">
          <h1 className="third-space__headline">What is “Third Space”?</h1>
          <p className="third-space__subheadline">
            Your life usually moves between two spaces.
          </p>
        </header>

        <div className="third-space__grid">
          <SpaceCard
            title="First Space"
            description="Your home — family, responsibilities, expectations."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 21V13C15 12.4 14.6 12 14 12H10C9.4 12 9 12.4 9 13V21M3 10c0-.6.3-1.1.7-1.5L10.7 2.5c.7-.6 1.8-.6 2.6 0l7 6c.4.4.7.9.7 1.5V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10z" />
              </svg>
            }
          />

          <SpaceCard
            title="Second Space"
            description="Your work or college — deadlines, performance, structure."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 20V4c0-1.1-.9-2-2-2H10C8.9 2 8 2.9 8 4V20M4 6H20c1.1 0 2 .9 2 2V18c0 1.1-.9 2-2 2H4C2.9 20 2 19.1 2 18V8C2 6.9 2.9 6 4 6z" />
              </svg>
            }
          />
        </div>

        <footer className="third-space__footer">
          <p className="third-space__transition">
            But in between these two, there should be a pause.
          </p>
          <h2 className="third-space__main-callout">
            That pause is the Third Space.
          </h2>
        </footer>
        <Button
          onClick={() => {
            navigate("/about");
          }}
          solid
        >
          Read More
        </Button>
      </div>
    </section>
  );
};

export default WhatIsThirdSpace;
