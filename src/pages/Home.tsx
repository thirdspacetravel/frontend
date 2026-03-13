import HeroSection from "../components/sections/HeroSection";
import InstitutionalCTA from "../components/sections/InstitutionalCtaSection";
import WhatIsThirdSpace from "../components/sections/WhatIsThirdSpaceSection";
import WhyTravel from "../components/sections/WhyTravelSection";
import TripsSection from "../components/trip/TripsSection";

const Home = () => {
  return (
    <>
      <HeroSection
        title="Space to Pause. Time to Connect."
        subtitle="The pause between routine and responsibility."
        imageSrc="./herosection/herosection1.jpg"
        featureList={[
          "Fixed Departures",
          "Pickup & Drop from Chandigarh",
          "15-Member Curated Groups",
          "No Hidden Costs",
        ]}
      />
      <WhatIsThirdSpace />
      <TripsSection />
      <WhyTravel />
      <InstitutionalCTA />
    </>
  );
};

export default Home;
