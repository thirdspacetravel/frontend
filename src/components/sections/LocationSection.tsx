import React from "react";
import Button from "../utils/Button";
import CheckIcon from "../../icons/CheckIcon";

interface FeatureItem {
  id: number;
  label: string;
}

const FEATURES: FeatureItem[] = [
  { id: 1, label: "Local Pickup & Drop-off Points" },
  { id: 2, label: "Direct Vendor Relationships" },
  { id: 3, label: "Regional Expertise of the Himalayas" },
  { id: 4, label: "Accessible Office for Walk-in Enquiries" },
];

const LocationSection: React.FC = () => {
  return (
    <section className="location-section">
      <div className="location-section__container">
        {/* Content Side */}
        <div className="location-section__content">
          <h2 className="location-section__title">
            Proudly Based in Chandigarh
          </h2>
          <p className="location-section__description">
            Our roots give us a unique advantage. Being local means we have
            direct relationships with regional vendors, ensuring better
            accountability and authentic experiences.
          </p>

          <ul className="location-section__features">
            {FEATURES.map((feature) => (
              <li key={feature.id} className="location-section__feature-item">
                <div className="location-section__icon-wrapper">
                  <CheckIcon />
                </div>
                <span className="location-section__feature-label">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          <Button solid>Visit Our Office</Button>
        </div>

        {/* Image Side */}
        <div className="location-section__image-container">
          <img
            src="./images/chandigarh.jpg"
            alt="Our Chandigarh Office"
            className="location-section__image"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
