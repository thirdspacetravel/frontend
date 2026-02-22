import React from "react";
import MailIcon from "../../../icons/MailIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import ChatIcon from "../../../icons/ChatIcon";
import { TextArea } from "../../../components/utils/InputUtils";
interface ContactInfo {
  name: string;
  institution: string;
  email: string;
  phone: string;
}
const contact: ContactInfo = {
  name: "Anjali Sharma",
  institution: "St. Xavier's College",
  email: "anjali.sharma@xaviers.edu",
  phone: "98765 43210",
};
const EnquiryDetailsView: React.FC = () => {
  return (
    <div className="content-canvas__container">
      <main className="content-canvas__main">
        <div className="content-canvas__card">
          <header className="content-canvas__header">
            <div className="content-canvas__info">
              <h1 className="content-canvas__title">
                College Trip for 40 students
              </h1>
              <span className="content-canvas__subtitle">ID: #ENQ-2402-12</span>
            </div>
          </header>

          <div className="content-canvas__body">
            <div className="inquiry-meta">
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Received</label>
                <p className="inquiry-meta__value">Today, 10:30 AM</p>
              </div>
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Source</label>
                <p className="inquiry-meta__value">Website Form</p>
              </div>
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Destination</label>
                <p className="inquiry-meta__value">Manali / Hill Station</p>
              </div>
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Group Size</label>
                <p className="inquiry-meta__value">40 Students + 3 Faculty</p>
              </div>
            </div>
            <div className="inquiry-message">
              <h2 className="inquiry-message__heading">Message from Client:</h2>
              <div className="inquiry-message__bubble">
                <p>"Hi Team,</p>
                <p>
                  We are planning an industrial visit + leisure trip for our BBA
                  final year students at {contact.institution}. We are looking
                  for a 4D/3N trip to Manali or similar hill stations where we
                  can combine some relaxation with a factory visit if possible.
                </p>
                <p>
                  Approx 40 students + 3 faculty members. Dates around mid-March
                  (15th-20th). Please share itinerary options and per-student
                  pricing including travel from Chandigarh."
                </p>
              </div>
            </div>

            <TextArea
              label="Quick Reply"
              id="quick-reply"
              placeholder="Type your response here..."
              defaultValue={`Thank you for your inquiry. We will get back to you shortly with a customized itinerary and pricing.`}
              rows={4}
            />
            <div className="inquiry-reply__actions">
              <button className="btn">Send Reply</button>
            </div>
          </div>
        </div>
      </main>
      <aside className="content-canvas__sidebar">
        <div className="content-canvas__card">
          <header className="content-canvas__header">
            <h2 className="content-canvas__title">Contact Person</h2>
          </header>

          <div className="content-canvas__body">
            <div className="contact-card__profile">
              <div className="contact-card__avatar">AS</div>
              <div className="contact-card__info">
                <h3 className="contact-card__name">{contact.name}</h3>
                <p className="contact-card__institution">
                  {contact.institution}
                </p>
              </div>
            </div>

            <div className="contact-card__actions">
              <a href={`mailto:${contact.email}`} className="contact-link">
                <MailIcon /> {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="contact-link">
                <PhoneIcon /> +91 {contact.phone}
              </a>
              <a
                href={`https://wa.me/${contact.phone.replace(/\s+/g, "")}`}
                target="_blank"
                className="contact-link"
              >
                <ChatIcon /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EnquiryDetailsView;
