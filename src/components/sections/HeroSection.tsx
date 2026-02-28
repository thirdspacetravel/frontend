import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
}) => {
  // const features = [
  //   { label: "Fixed Departures", icon: "fixed" },
  //   { label: "Pickup & Drop from Chandigarh", icon: "pickup" },
  //   { label: "26-Member Curated Groups", icon: "group" },
  //   { label: "No Hidden Costs", icon: "costs" },
  // ];

  return (
    <div className="hero">
      <div className="hero__background">
        {/* 2. Use the imageSrc prop here */}
        <img src={imageSrc} alt="Hero Background" />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          {/* 3. Use the title and subtitle props here */}
          <h1 className="hero__title">{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
        </div>

        {/* <div className="hero__features">
          {features.map((item) => (
            <div key={item.label} className="feature-tag">
              <div className="feature-tag__icon-box">
                <div className={`icon icon--${item.icon}`}></div>
              </div>
              <span className="feature-tag__label">{item.label}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
