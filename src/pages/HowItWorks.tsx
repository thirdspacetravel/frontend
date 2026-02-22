import CallToAction from "../components/sections/CallToActionSection";
import FaqAccordion from "../components/sections/FaqAccordionSection";
import HeroSection from "../components/sections/HeroSection";
import ProcessSteps from "../components/sections/ProcessStepsSection";
import TrustBanner from "../components/sections/TrustworthinessSection";

const HowItWorks = () => {
  return (
    <>
      <HeroSection
        title="Travel Without The Planning Headache"
        subtitle="From browsing your next adventure to returning home with stories, here is how we make group travel seamless for you."
        imageSrc="./herosection/herosection4.jpg"
      />
      <ProcessSteps />
      <TrustBanner />
      <FaqAccordion />
      <CallToAction />
    </>
  );
};

export default HowItWorks;
