import React from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  img: string;
}

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
    description:
      "Department tours, industrial visits, cultural immersions, and structured academic programs.",
    img: "colleges-and-universities.jpg",
  },
  {
    id: 2,
    title: "Schools",
    description:
      "Supervised educational excursions, nature camps, and curriculum-linked exposure trips.",
    img: "schools.jpg",
  },
  {
    id: 3,
    title: "Coaching Institutes",
    description:
      "Structured stress-relief retreats and focus-reset programs for competitive aspirants.",
    img: "coaching-institutes.jpg",
  },
  {
    id: 4,
    title: "Student Societies",
    description:
      "Leadership offsites, bonding retreats, and experiential group programs.",
    img: "student-societies.jpg",
  },
  {
    id: 5,
    title: "Faculty Retreats",
    description:
      "Planning retreats, annual faculty offsites, and structured leisure programs.",
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
