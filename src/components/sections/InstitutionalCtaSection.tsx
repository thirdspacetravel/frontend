import React from "react";
import { useNavigate } from "react-router";
import Button from "../utils/Button";
import ArrowRight from "../../icons/ArrowRightIcon";

const InstitutionalCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="inst-cta">
      <div className="inst-cta__container">
        <div className="inst-cta__content">
          <h2 className="inst-cta__title">
            Trusted Group Travel for Colleges & Institutions
          </h2>
          <p className="inst-cta__description">
            Structured, compliant, and student-first itineraries for academic
            breaks, immersions, and retreats.
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/corporate-trips");
          }}
          solid
        >
          Corporate & Institutional Trips
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default InstitutionalCTA;
