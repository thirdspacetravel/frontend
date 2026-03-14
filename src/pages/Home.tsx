import { useNavigate } from "react-router";
import HeroSection from "../components/sections/HeroSection";
import InstitutionalCTA from "../components/sections/InstitutionalCtaSection";
import WhatIsThirdSpace from "../components/sections/WhatIsThirdSpaceSection";
import WhyTravel from "../components/sections/WhyTravelSection";
import TripsSection from "../components/trip/TripsSection";
import Button from "../components/utils/InteractiveButton";
import ArrowRight from "../icons/ArrowRightIcon";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeroSection
        title="Travel with Strangers. Return with Stories."
        subtitle="Weekend adventures, backpacking trips, and unforgettable travel experiences with a community of like-minded explorers."
        mediaSrc="./herosection/herosection1.mp4"
        bgType="video"
        featureList={[
          "Fixed Departures",
          "Pickup & Drop from Chandigarh",
          "15-Member Curated Groups",
          "No Hidden Costs",
        ]}
        button={
          <Button
            onClick={() => {
              navigate("/group-trips");
            }}
            inverted
            solid
          >
            Explore Upcoming Trips
            <ArrowRight />
          </Button>
        }
      />
      <WhatIsThirdSpace />
      <TripsSection />
      <WhyTravel />
      <InstitutionalCTA />
    </>
  );
};

export default Home;
