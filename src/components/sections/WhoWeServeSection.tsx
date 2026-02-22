import React from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  img: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Colleges & Universities",
    description: "Department trips, fests, and society bondings.",
    img: "colleges-and-universities.jpg",
  },
  {
    id: 2,
    title: "Schools",
    description: "Safe excursions and nature camps for juniors.",
    img: "schools.jpg",
  },
  {
    id: 3,
    title: "Coaching Institutes",
    description: "Stress-buster retreats for competitive aspirants.",
    img: "coaching-institutes.jpg",
  },
  {
    id: 4,
    title: "Student Societies",
    description: "Leadership camps and team-building offsites.",
    img: "student-societies.jpg",
  },
  {
    id: 5,
    title: "Faculty Retreats",
    description: "Leisure and planning trips for staff.",
    img: "faculty-retreats.jpg",
  },
];

const WhoWeServe: React.FC = () => {
  return (
    <section className="who-we-serve">
      <div className="who-we-serve__container">
        <header className="who-we-serve__header">
          <h2 className="who-we-serve__title">Who We Serve</h2>
          <p className="who-we-serve__subtitle">
            Tailored itineraries for every type of educational institution.
          </p>
        </header>

        <div className="who-we-serve__grid">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="who-we-serve__card">
              <div className="who-we-serve__img-wrapper">
                <img src={`./images/${service.img}`} alt={service.title} />
              </div>
              <h3 className="who-we-serve__card-title">{service.title}</h3>
              <p className="who-we-serve__card-text">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
