import React from "react";
import { useNavigate } from "react-router";
import ArrowRight from "../../icons/ArrowRightIcon";
import Button from "../utils/Button";
import TripCard from "../cards/TripCard";

const TRIPS = [
  {
    id: "1",
    title: "Manali Leisure",
    image: "https://placehold.co/363x240",
    badge: "Best Seller",
    date: "Apr 12-15",
    duration: "4D/3N",
    tags: ["Stay", "Meals", "Trek", "Transport"],
    price: "8,499",
  },
  {
    id: "2",
    title: "Goa Unwind",
    image: "https://placehold.co/363x240",
    badge: "Relaxing",
    date: "May 05-08",
    duration: "4D/3N",
    tags: ["Villa Stay", "Breakfast", "Yoga", "Scooter"],
    price: "12,999",
  },
  {
    id: "3",
    title: "Gokarna Beach Trek",
    image: "https://placehold.co/363x240",
    badge: "Adventure",
    date: "Apr 20-22",
    duration: "3D/2N",
    tags: ["Camping", "Bonfire", "Guide", "Meals"],
    price: "5,999",
  },
];

const TripsSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="trips-section">
      <div className="trips-section__container">
        <header className="trips-section__header">
          <h2 className="trips-section__title">Upcoming Group Trips</h2>
          <p className="trips-section__subtitle">
            Curated experiences designed for connection and calm.
          </p>
        </header>

        <div className="trips-section__grid">
          {TRIPS.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <div className="trips-section__actions">
          <Button
            onClick={() => {
              navigate("/group-trips");
            }}
            solid
          >
            See All
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;
