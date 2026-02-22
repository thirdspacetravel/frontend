import React from "react";
import { useNavigate } from "react-router";
import Button from "../utils/Button";

const WhatIsThirdSpace: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="third-space">
      <div className="third-space__container">
        <div className="third-space__content">
          <h2 className="third-space__title">What is “Third Space”?</h2>

          <p className="third-space__description">
            A “third space” is the pause between routine and responsibility. Our
            trips are designed to give students and young professionals a calm,
            structured break — not rushed tourism, not chaotic backpacking.
          </p>
          <Button
            onClick={() => {
              navigate("/about");
            }}
            solid
          >
            Read More
          </Button>
        </div>

        <div className="third-space__image-wrapper">
          <img
            className="third-space__image"
            src="./images/whatisthirdspace.jpg"
            alt="A calm traveler looking at nature"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatIsThirdSpace;
