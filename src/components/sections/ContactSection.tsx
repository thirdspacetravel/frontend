import React, { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../utils/Button";
import MailIcon from "../../icons/MailIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import ChatIcon from "../../icons/ChatIcon";
import { EnquiryType } from "../../../../backend/src/generated/prisma/browser";
import { trpc } from "../../trpc";
import { useNotification } from "../../hooks/useNotification";

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
            window.open(`https://wa.me/7719783377`, "_blank");
          }
        }}
      >
        {actionText}
      </button>
    </div>
  </div>
);
export const ContactSection: React.FC = () => {
  const { notify } = useNotification();
  const createEnquiryMutation = trpc.public.createEnquiry.useMutation({
    onSuccess: () => {
      notify("Enquiry submitted successfully!", "success");
    },
    onError: (error) => {
      let errorMessage = "Failed to submit enquiry.";

      try {
        const errorData = JSON.parse(error.message);
        if (typeof errorData === "object" && errorData !== null) {
          errorMessage = Object.values(errorData).join("\n");
        }
      } catch (e) {
        errorMessage = error.message || (e as string);
      }

      notify(errorMessage, "error");
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
    createEnquiryMutation.mutate({
      fullName: formData.fullName,
      email: formData.email,
      message: formData.message,
      subject: formData.subject,
      type: EnquiryType.CONTACT,
    });
  };
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
            value="+91 77197 83377"
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
        <form className="enquiry-form" onSubmit={handleSubmit}>
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
              value={formData.fullName}
              placeholder="Enter your name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input__field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              name="email"
              placeholder="yourname@gmail.com"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input__field">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              name="subject"
              placeholder="Enter subject of your enquiry"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              placeholder="Tell us more about your travel plans..."
              required
              onChange={handleChange}
            />
          </div>
          <Button solid onClick={handleSubmit}>
            Send Enquiry
          </Button>
        </form>
      </div>
    </section>
  );
};
