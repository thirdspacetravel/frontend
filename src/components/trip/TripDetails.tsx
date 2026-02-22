import React, { useState } from "react";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import CheckIcon from "../../icons/CheckIcon";
import CloseCircleIcon from "../../icons/CloseCircleIcon";
interface ItineraryStep {
  day: number;
  title: string;
  description: string;
}

interface InclusionItem {
  text: string;
  isIncluded: boolean;
}

const itinerary: ItineraryStep[] = [
  {
    day: 1,
    title: "Arrival in Manali & Acclimatization",
    description:
      "Arrive in Manali by morning. Check into our boutique property nestled in the orchards. Post lunch, we gather for an ice-breaking session and a gentle walk to the nearby Hadimba Temple. Evening at leisure to explore Old Manali cafés. Dinner at the hotel.",
  },
  {
    day: 2,
    title: "Solang Valley & Atal Tunnel",
    description:
      "Explore the scenic Solang Valley and experience the engineering marvel of the Atal Tunnel.",
  },
  {
    day: 3,
    title: "Journey to Kaza (Spiti Valley)",
    description:
      "A breathtaking drive through the high mountain passes towards the heart of Spiti.",
  },
  {
    day: 4,
    title: "Key Monastery & High Villages",
    description:
      "Visit the iconic Key Monastery and explore the highest inhabited villages in the world.",
  },
  {
    day: 5,
    title: "Langza, Hikkim & Komic",
    description:
      "Postcard-perfect views and visits to the world's highest post office.",
  },
  {
    day: 6,
    title: "Departure",
    description:
      "Bid farewell to the mountains and head back with lifelong memories.",
  },
];

const inclusions: InclusionItem[] = [
  { text: "Accommodation on twin/triple sharing", isIncluded: true },
  { text: "Breakfast and Dinner on all days", isIncluded: true },
  { text: "All transfers in private tempo traveler", isIncluded: true },
  { text: "Experienced Trip Captain", isIncluded: true },
  { text: "Any personal expenses", isIncluded: false },
  { text: "Lunch (to explore local cafes)", isIncluded: false },
  { text: "Entry tickets to monuments", isIncluded: false },
];
const ResortDetails: React.FC = () => {
  const [openDay, setOpenDay] = useState<number | null>(null);

  return (
    <section className="resort-page">
      <div className="resort-page__container">
        <header className="resort-page__header">
          <h1 className="resort-page__title">About the Resort</h1>
          <p className="resort-page__description">
            Perched 2,000 meters above sea level, Jiwa Jawa Resort Bromo is a
            sanctuary where nature, art, and heritage converge. Built with an
            eco-conscious philosophy, the resort seamlessly blends into the
            stunning landscape of the Tengger massif.
          </p>
          <p className="resort-page__description">
            Beyond its luxurious accommodations, Jiwa Jawa is home to the
            renowned Java Banana Gallery, showcasing magnificent photography and
            local art.
          </p>
        </header>

        <main className="resort-page__grid">
          <div className="itinerary">
            <h2 className="itinerary__heading">Day-wise Itinerary</h2>
            <div className="itinerary__list">
              {itinerary.map((item) => (
                <article
                  key={item.day}
                  className={`itinerary__item ${openDay === item.day ? "itinerary__item--active" : ""}`}
                >
                  <button
                    className="itinerary__trigger"
                    onClick={() =>
                      setOpenDay(openDay === item.day ? null : item.day)
                    }
                  >
                    <span className="itinerary__day-title">
                      Day {item.day}: {item.title}
                    </span>
                    <ChevronDownIcon
                      className={`itinerary__icon ${openDay === item.day ? "up" : "down"}`}
                    />
                  </button>
                  <div className="itinerary__content">
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="sidebar">
            <div className="sidebar__card inclusions">
              <ul className="inclusions__list">
                {inclusions.map((item, index) => (
                  <li key={index} className="inclusions__item">
                    {item.isIncluded ? (
                      <CheckIcon className="icon--success" />
                    ) : (
                      <CloseCircleIcon className="icon--error" />
                    )}
                    <span className="inclusions__text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar__card safety">
              <h3 className="safety__title">Safety & Trust</h3>
              <ul className="safety__list">
                <li>Dedicated Trip Captain accompanies the group 24/7.</li>
                <li>Emergency support protocols & first aid kit available.</li>
                <li>Verified hotels and transport partners only.</li>
              </ul>
            </div>

            <div className="sidebar__footer">
              <h4 className="sidebar__transparency-title">
                Pricing Transparency
              </h4>
              <p className="sidebar__transparency-text">
                The price you see is what you pay. No hidden service charges.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </section>
  );
};

export default ResortDetails;
