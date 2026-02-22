import HeroSection from "../components/sections/HeroSection";
import LocationSection from "../components/sections/LocationSection";
import ValuesSection from "../components/sections/ValuesSection";

const About = () => {
  return (
    <>
      <HeroSection
        title="The Pause Between Routine & Responsibility"
        subtitle="Third Space Travel was created to offer structured, affordable, and meaningful group travel experiences for young India. We believe travel shouldn't be a checklist, but a space to breathe, connect, and reset."
        imageSrc="./herosection/herosection5.jpg"
      />
      <ValuesSection />
      <LocationSection />
    </>
  );
};

export default About;
