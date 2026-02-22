import React from "react";
import { CustomDropdown } from "../utils/InputUtils";
import Button from "../utils/Button";
import MailIcon from "../../icons/MailIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import ChatIcon from "../../icons/ChatIcon";

interface ContactCardProps {
  label: string;
  value: string;
  actionText: string;
  icon: React.ReactNode;
  actionType: "call" | "email" | "whatsapp";
}

const ContactCard: React.FC<ContactCardProps> = ({
  label,
  value,
  actionText,
  icon,
  actionType,
}) => (
  <div className="contact-card">
    <div className="contact-card__icon-wrapper">{icon}</div>
    <div className="contact-card__content">
      <span className="contact-card__label">{label}</span>
      <h3 className="contact-card__value">{value}</h3>
      <button
        className="contact-card__action"
        onClick={() => {
          if (actionType === "call") {
            window.location.href = `tel:${value}`;
          } else if (actionType === "email") {
            window.location.href = `mailto:${value}`;
          } else if (actionType === "whatsapp") {
            window.open(`https://wa.me/9876543210`, "_blank");
          }
        }}
      >
        {actionText}
      </button>
    </div>
  </div>
);
export const ContactSection: React.FC = () => {
  const roomOptions = [
    { label: "Standard Room", value: 1 },
    { label: "Deluxe Mountain View", value: 2 },
    { label: "Presidential Suite", value: 3 },
  ];
  return (
    <section className="contact-section">
      <div className="contact-section__container">
        {/* Left Side: Contact Options */}
        <div className="contact-section__options">
          <ContactCard
            label="Quickest Response"
            value="WhatsApp Chat"
            actionText="Chat with us"
            icon={<ChatIcon />}
            actionType="whatsapp"
          />
          <ContactCard
            label="Call Us"
            value="+91 98765 43210"
            actionText="Call now"
            icon={<PhoneIcon />}
            actionType="call"
          />
          <ContactCard
            label="Email Support"
            value="thirdspacetravel@gmail.com"
            actionText="Send email"
            icon={<MailIcon />}
            actionType="email"
          />
        </div>
        <form className="enquiry-form" onSubmit={(e) => e.preventDefault()}>
          <header className="enquiry-form__header">
            <h2 className="enquiry-form__title">Send an Enquiry</h2>
            <p className="enquiry-form__subtitle">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </header>

          <div className="input__field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input__field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-prefix">
              <span className="prefix">+91</span>
              <input type="tel" id="phoneNumber" name="phoneNumber" required />
            </div>
          </div>

          <div className="input__field">
            <label htmlFor="tripInterest">Trip Interest</label>

            <CustomDropdown
              options={roomOptions}
              onSelect={(val) => console.log(val)}
            />
          </div>

          <div className="input__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us more about your travel plans..."
            />
          </div>
          <Button solid>Send Enquiry</Button>
        </form>
      </div>
    </section>
  );
};
