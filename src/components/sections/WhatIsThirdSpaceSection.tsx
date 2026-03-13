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
          <div>
            <p className="third-space__description">
              Your life usually moves between two spaces.
            </p>
            <p className="third-space__description">
              First Space is your home — family, responsibilities, expectations.
              <br />
              Second Space is your work or college — deadlines, performance,
              structure.
            </p>
            <p className="third-space__description">
              But in between these two, there should be a pause.
            </p>
            <br />
            <p className="third-space__description">
              That pause is the Third Space.
            </p>
          </div>
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
