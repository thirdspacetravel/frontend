import React, { useState } from "react";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import CheckIcon from "../../icons/CheckIcon";
import CloseCircleIcon from "../../icons/CloseCircleIcon";
import type { TripDetails as TripDetailsType } from "../../admin/components/trips/types";

const TripDetails: React.FC<{ trip: TripDetailsType }> = ({ trip }) => {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const itinerary = trip.itinerary || [];
  return (
    <section className="resort-page">
      <div className="resort-page__container">
        <header className="resort-page__header">
          <h1 className="resort-page__title">Trip Highlights</h1>
          {trip.fullOverview.split("\n").map((paragraph, index) => (
            <p key={index} className="resort-page__description">
              {paragraph}
            </p>
          ))}
        </header>

        <main className="resort-page__grid">
          {/* --- ITINERARY SECTION --- */}
          <div className="itinerary">
            <h2 className="itinerary__heading">Day-wise Itinerary</h2>
            <div className="itinerary__list">
              {itinerary.map((item, index) => (
                <article
                  key={item.title}
                  className={`itinerary__item ${openDay === index ? "itinerary__item--active" : ""}`}
                >
                  <button
                    className="itinerary__trigger"
                    onClick={() => setOpenDay(openDay === index ? null : index)}
                  >
                    <span className="itinerary__day-title">
                      Day {index + 1}: {item.title}
                    </span>
                    <ChevronDownIcon
                      className={`itinerary__icon ${openDay === index ? "up" : "down"}`}
                    />
                  </button>
                  <div className="itinerary__content">
                    <p>{item.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* --- SIDEBAR SECTION --- */}
          <aside className="sidebar">
            <div className="sidebar__card inclusions">
              <ul className="inclusions__list">
                {trip.inclusions.split("\n").map((item, index) => (
                  <li key={index} className="inclusions__item">
                    <CheckIcon className="icon--success" />
                    <span className="inclusions__text">{item}</span>
                  </li>
                ))}
                {trip.exclusions.split("\n").map((item, index) => (
                  <li key={index} className="inclusions__item">
                    <CloseCircleIcon className="icon--error" />
                    <span className="inclusions__text">{item}</span>
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

export default TripDetails;
