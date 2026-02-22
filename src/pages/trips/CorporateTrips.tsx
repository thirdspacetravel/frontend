import CuratedExperiences from "../../components/sections/CuratedExperiencesSection";
import HeroSection from "../../components/sections/HeroSection";
import WhoWeServe from "../../components/sections/WhoWeServeSection";
import WhyChooseUs from "../../components/sections/WhyChooseUsSection";
import EnquiryForm from "../../components/utils/EnquiryForm";

const CorporateTrips = () => {
  return (
    <>
      <HeroSection
        title="CorporateTrips & Institutional Group Travel Solutions"
        subtitle="We design safe, structured, and immersive travel experiences for students and faculty. Beyond tourism, towards learning."
        imageSrc="./herosection/herosection3.jpg"
      />
      <WhoWeServe />
      <CuratedExperiences />
      <WhyChooseUs />
      <EnquiryForm />
    </>
  );
};

export default CorporateTrips;
