import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  mediaSrc: string; // Renamed for clarity (handles both img and video)
  bgType?: "image" | "video"; // New parameter
  featureList?: string[];
  button?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  mediaSrc,
  bgType = "image", // Defaulting to image
  featureList = [],
  button = <></>,
}) => {
  return (
    <div className="hero">
      <div className="hero__background">
        {bgType === "video" ? (
          <video
            src={mediaSrc}
            autoPlay
            muted
            loop
            playsInline
            className="hero__video"
          />
        ) : (
          <img src={mediaSrc} alt="Hero Background" className="hero__image" />
        )}
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
          {button}
        </div>

        {featureList?.length > 0 && (
          <div className="hero__features">
            {featureList.map((item, index) => (
              <div key={index} className="feature-tag">
                <span className="feature-tag__label">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
