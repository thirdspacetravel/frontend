import { ContactSection } from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";

const Contact = () => {
  return (
    <>
      <HeroSection
        title="Start Your Journey"
        subtitle="Whether you have a question about an upcoming trip or want to plan a custom institutional tour, we're here to help."
        mediaSrc="./herosection/herosection6.jpg"
      />
      <ContactSection />
    </>
  );
};

export default Contact;
