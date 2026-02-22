import React from "react";
import SecurityIcon from "../../icons/SecurityIcon";
import UserVerifiedIcon from "../../icons/UserTickIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import UsersIcon from "../../icons/UsersIcon";

interface TrustFeature {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const TRUST_FEATURES: TrustFeature[] = [
  { id: 1, label: "Verified Stays & Transport", icon: <SecurityIcon /> },
  { id: 2, label: "Trained Trip Captains", icon: <UserVerifiedIcon /> },
  { id: 3, label: "24/7 Back-end Support", icon: <PhoneIcon /> },
  { id: 4, label: "Safe for Solo Travelers", icon: <UsersIcon /> },
];

const TrustBanner: React.FC = () => {
  return (
    <section className="trust-banner">
      <div className="trust-banner__container">
        <div className="trust-banner__image-wrapper">
          <img
            className="trust-banner__image"
            src="./images/why-travel.jpg"
            alt="Trip Captain leading a group"
          />
        </div>

        <div className="trust-banner__content">
          <header className="trust-banner__header">
            <h2 className="trust-banner__title">Why Travelers Trust Us</h2>
            <p className="trust-banner__description">
              We don't just aggregate hotels. We curate experiences. Every trip
              is led by a trained Trip Captain who ensures safety, breaks the
              ice, and handles emergencies.
            </p>
          </header>

          <ul className="trust-banner__feature-list">
            {TRUST_FEATURES.map((feature) => (
              <li key={feature.id} className="trust-banner__feature-item">
                <div className="trust-banner__icon-box">{feature.icon}</div>
                <span className="trust-banner__feature-text">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
