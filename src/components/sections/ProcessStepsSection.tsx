import React from "react";

interface Step {
  id: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: "01",
    title: "Browse & Discover",
    description:
      "Explore our curated list of upcoming fixed-departure trips. Filter by weekend getaways, long backpacks, or budget. We keep our groups small and our itineraries unique.",
    image: "Browse Trips.jpg",
  },
  {
    id: "02",
    title: "Enquire & Connect",
    description:
      "Have questions? Click the WhatsApp button or fill out an enquiry form. You'll chat with a real trip coordinator, not a bot. We'll share the detailed PDF itinerary with day-wise plans.",
    image: "Connect.jpg",
  },
  {
    id: "03",
    title: "Secure Your Spot",
    description:
      "Once you're ready, pay a token amount to block your seat. You'll receive an instant booking confirmation and a receipt via email. No hidden charges—what you see is what you pay.",
    image: "Booking.jpg",
  },
  {
    id: "04",
    title: "Pre-Trip Coordination",
    description:
      "24 hours before the trip, you'll be added to a WhatsApp group with your fellow travelers and the Trip Captain. Receive packing lists, pickup points, and last-minute tips.",
    image: "Packing.jpg",
  },
  {
    id: "05",
    title: "Travel Worry-Free",
    description:
      "Show up at the meeting point and let us handle the rest. Your Trip Captain manages logistics, check-ins, and timelines, so you can focus on making memories.",
    image: "Travel.jpg",
  },
];

const ProcessSteps: React.FC = () => {
  return (
    <section className="process-section">
      <div className="process-section__container">
        {steps.map((step) => (
          <div key={step.id} className="process-step">
            <div className="process-step__number-wrapper">
              <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="0"
                  y="50%"
                  textAnchor="start"
                  dominantBaseline="central"
                  className="stroked-number"
                >
                  {step.id}
                </text>
              </svg>
            </div>

            <div className="process-step__content">
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__description">{step.description}</p>
              <div className="process-step__image-container">
                <img
                  src={`./images/${step.image}`}
                  alt={step.title}
                  className="process-step__image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
