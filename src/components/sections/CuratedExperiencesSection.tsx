import React from "react";

interface TripType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const tripData: TripType[] = [
  {
    id: 1,
    title: "Educational Tours",
    description: "History, geography, and science coming alive.",
    imageUrl: "Educational.jpg",
  },
  {
    id: 2,
    title: "Industrial Visits",
    description: "Practical exposure to real-world operations.",
    imageUrl: "Industrial.jpg",
  },
  {
    id: 3,
    title: "Cultural Exposure",
    description: "Immersive local experiences and heritage walks.",
    imageUrl: "Cultural.jpg",
  },
  {
    id: 4,
    title: "Bonding Trips",
    description: "Orientations and freshers' ice-breaking events.",
    imageUrl: "Bonding.jpg",
  },
];

const CuratedExperiences: React.FC = () => {
  return (
    <section className="curated-section">
      <div className="curated-section__container">
        <header className="curated-section__header">
          <h2 className="curated-section__title">Curated Experiences</h2>
          <p className="curated-section__subtitle">
            Choose the intent of your travel, and we'll handle the logistics.
          </p>
        </header>

        <div className="curated-section__grid">
          {tripData.map((trip) => (
            <div key={trip.id} className="curated-card">
              <img
                src={`./images/${trip.imageUrl}`}
                alt={trip.title}
                className="curated-card__image"
              />
              <div className="curated-card__overlay" />
              <div className="curated-card__content">
                <h3 className="curated-card__title">{trip.title}</h3>
                <p className="curated-card__description">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedExperiences;
