import BookingSection from "../../components/sections/BookingSection";
import HeroSection from "../../components/sections/HeroSection";
import InstitutionalCTA from "../../components/sections/InstitutionalCtaSection";

const GroupTrips = () => {
  return (
    <>
      <HeroSection
        title="Upcoming Fixed-Departure Group Trips from Chandigarh"
        subtitle="Join like-minded travelers on curated journeys starting from the City Beautiful."
        imageSrc="./herosection/herosection2.jpg"
      />
      <BookingSection />
      <InstitutionalCTA />
    </>
  );
};

export default GroupTrips;
