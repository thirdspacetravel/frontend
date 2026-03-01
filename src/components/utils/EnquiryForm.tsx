import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import ArrowRight from "../../icons/ArrowRightIcon";
import { trpc } from "../../trpc";
import { PrefixInput, TextInput } from "./InputUtils";
import { EnquiryType } from "../../../../backend/src/generated/prisma/enums";

const EnquiryForm: React.FC = () => {
  const createEnquiryMutation = trpc.public.createEnquiry.useMutation({
    onSuccess: () => {
      alert("Enquiry submitted successfully!");
    },
    onError: (error) => {
      alert(
        error.message || "Failed to submit enquiry. Please try again later.",
      );
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    institutionName: "",
    designation: "",
    email: "",
    subject: "",
    destination: "",
    groupSize: "",
    travelDates: "",
    phoneNumber: "",
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
      institutionName: "",
      designation: "",
      email: "",
      subject: "",
      destination: "",
      groupSize: "",
      travelDates: "",
      phoneNumber: "",
      message: "",
    });
    createEnquiryMutation.mutate({
      fullName: formData.fullName,
      institutionName: formData.institutionName,
      designation: formData.designation,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      groupSize: formData.groupSize,
      travelDates: formData.travelDates,
      message: formData.message,
      subject: formData.subject,
      type: EnquiryType.REQUEST,
      destination: formData.destination,
    });
  };

  return (
    <section className="enquiry-section">
      <div className="enquiry-section__container">
        <div className="enquiry-section__header">
          <h2 className="enquiry-section__title">
            Plan Your Institutional Trip
          </h2>
          <p className="enquiry-section__subtitle">
            Fill out the details below and our corporate team will get back to
            you with a proposal.
          </p>
        </div>

        <div className="enquiry-card">
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="enquiry-form__grid">
              {/* Institution Name - Full Width */}
              <div className="input__field">
                <label htmlFor="institutionName">Institution Name</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  placeholder="e.g. Delhi University - History Dept"
                  value={formData.institutionName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact Person */}
              <div className="input__field">
                <label htmlFor="fullName">Ful Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <TextInput
                label="Designation"
                id="designation"
                name="designation"
                placeholder="e.g. Student Head / Professor"
                value={formData.designation}
                onChange={handleChange}
                required
              />

              <PrefixInput
                label="Phone Number"
                prefix="+91"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />

              {/* Official Email */}
              <div className="input__field">
                <label htmlFor="email">Official Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@institution.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input__field">
                <label htmlFor="groupSize">Group Size (Approx)</label>
                <input
                  id="groupSize"
                  name="groupSize"
                  placeholder="e.g. 45"
                  value={formData.groupSize}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Travel Dates */}
              <div className="input__field">
                <label htmlFor="travelDates">Travel Dates</label>
                <input
                  type="text"
                  id="travelDates"
                  name="travelDates"
                  placeholder="Month / Dates"
                  value={formData.travelDates}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input__field">
                <label htmlFor="subject">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="e.g. Pune - Space Museum"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input__field input__field--full">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g. History of Space Exploration"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input__field input__field--full">
                <label htmlFor="message">Preferred Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us where you want to go or what kind of experience you are looking for..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button solid>
              Request Proposal
              <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
