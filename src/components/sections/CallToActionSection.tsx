import React from "react";
import { useNavigate } from "react-router";
import Button from "../utils/Button";
import ArrowRight from "../../icons/ArrowRightIcon";
const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-card">
        <div className="cta-card__content">
          <h2 className="cta-card__title">Ready to find your Third Space?</h2>
          <p className="cta-card__description">
            Join a community of travelers who value pause, connection, and
            discovery.
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/corporate-trips");
          }}
          solid
          inverted
        >
          Corporate & Institutional Trips
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
