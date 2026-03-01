import MailIcon from "../../../icons/MailIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import { TextArea } from "../../../components/utils/InputUtils";
import type {
  Enquiry,
  EnquiryStatus,
} from "../../../../../backend/src/generated/prisma/client";
import Button from "../../../components/utils/Button";
import { trpc } from "../../../trpc";
import { useState } from "react";

const EnquiryDetailsView = ({ enquiryData }: { enquiryData: Enquiry }) => {
  const utils = trpc.useUtils();
  const [reply, setReply] = useState(
    enquiryData.reply || `Dear ${enquiryData.fullName},\n`,
  );

  // 1. Define the Mutation
  const updateStatus = trpc.admin.updateEnquiryStatus.useMutation({
    onSuccess: () => {
      alert("Status updated successfully!");
      utils.admin.fetchEnquiriesById.invalidate({ id: enquiryData.id });
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    },
  });

  const handleStatusChange = (newStatus: EnquiryStatus) => {
    if (!reply.trim()) {
      alert("Reply cannot be empty.");
      return;
    }
    updateStatus.mutate({
      id: enquiryData.id,
      status: newStatus,
      reply: reply,
    });
  };

  // Check if it's a general contact type to hide travel-specific fields
  const isContactType = enquiryData.type === "CONTACT";

  // Helper to format the date
  const formattedDate = new Date(enquiryData.createdAt).toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="content-canvas__container">
      <main className="content-canvas__main">
        <div className="content-canvas__card">
          <header className="content-canvas__header">
            <div className="content-canvas__info">
              <h1 className="content-canvas__title">
                {enquiryData.subject || "No Subject Provided"}
              </h1>
              <span className="content-canvas__subtitle">
                #ENQ-{enquiryData.id.slice(0, 4).toUpperCase()}-
                {enquiryData.id.slice(4, 8).toUpperCase()}-
                {enquiryData.enquiryNo.toString().padStart(4, "0")}
              </span>
            </div>
          </header>

          <div className="content-canvas__body">
            <div className="inquiry-meta">
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Received</label>
                <p className="inquiry-meta__value">{formattedDate}</p>
              </div>
              <div className="inquiry-meta__item">
                <label className="inquiry-meta__label">Source</label>
                <p className="inquiry-meta__value">Website Form</p>
              </div>

              {/* Conditional Rendering: Hide for CONTACT type */}
              {!isContactType && (
                <>
                  <div className="inquiry-meta__item">
                    <label className="inquiry-meta__label">Destination</label>
                    <p className="inquiry-meta__value">
                      {enquiryData.destination || "Not Specified"}
                    </p>
                  </div>
                  <div className="inquiry-meta__item">
                    <label className="inquiry-meta__label">Group Size</label>
                    <p className="inquiry-meta__value">
                      {enquiryData.groupSize} People
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="inquiry-message">
              <h2 className="inquiry-message__heading">Message from Client:</h2>
              <div className="inquiry-message__bubble">
                {enquiryData.message.split("\n").map((item) => (
                  <p style={{ whiteSpace: "pre-wrap" }}>{item}</p>
                ))}
              </div>
            </div>

            {enquiryData.status === "NEW" ||
            enquiryData.status === "PENDING" ? (
              <TextArea
                label="Quick Reply"
                id="quick-reply"
                value={reply}
                placeholder="Type your response here..."
                rows={4}
                onChange={(e) => setReply(e.target.value)}
              />
            ) : (
              <div className="inquiry-message">
                <h2 className="inquiry-message__heading">Reply:</h2>
                <div className="inquiry-message__bubble">
                  {enquiryData.reply?.split("\n").map((item) => (
                    <p style={{ whiteSpace: "pre-wrap" }}>{item}</p>
                  ))}
                </div>
              </div>
            )}
            {(enquiryData.status === "NEW" ||
              enquiryData.status === "PENDING") &&
              (enquiryData.type === "REQUEST" ? (
                <div className="inquiry-reply__actions">
                  <Button
                    solid
                    className="btn--accept"
                    onClick={() => handleStatusChange("ACCEPTED")}
                  >
                    Accept
                  </Button>
                  <Button
                    solid
                    className="btn--danger"
                    onClick={() => handleStatusChange("REJECTED")}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="inquiry-reply__actions">
                  <Button onClick={() => handleStatusChange("ACCEPTED")}>
                    Send Reply
                  </Button>
                </div>
              ))}
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
              <div className="contact-card__avatar">
                {enquiryData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="contact-card__info">
                <h3 className="contact-card__name">{enquiryData.fullName}</h3>
                <p className="contact-card__institution">
                  {enquiryData.institutionName}
                </p>
                <p
                  className="contact-card__designation"
                  style={{ fontSize: "0.8rem", opacity: 0.7 }}
                >
                  {enquiryData.designation}
                </p>
              </div>
            </div>

            <div className="contact-card__actions">
              <a href={`mailto:${enquiryData.email}`} className="contact-link">
                <MailIcon /> {enquiryData.email}
              </a>
              {enquiryData.phoneNumber && (
                <a
                  href={`tel:+91 ${enquiryData.phoneNumber}`}
                  className="contact-link"
                >
                  <PhoneIcon /> +91 {enquiryData.phoneNumber}
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EnquiryDetailsView;
