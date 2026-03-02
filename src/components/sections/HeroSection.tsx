import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  featureList?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  featureList = [],
}) => {
  return (
    <div className="hero">
      <div className="hero__background">
        <img src={imageSrc} alt="Hero Background" />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
        </div>
        {featureList?.length && featureList.length > 0 ? (
          <div className="hero__features">
            {featureList.map((item, index) => (
              <div key={index} className="feature-tag">
                <span className="feature-tag__label">{item}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeroSection;
