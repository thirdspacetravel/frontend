import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import ArrowRight from "../../icons/ArrowRightIcon";
import { NumberInput, PrefixInput, TextInput } from "./InputUtils";

interface FormData {
  institutionName: string;
  contactPerson: string;
  designation: string;
  phoneNumber: string;
  email: string;
  groupSize: string;
  travelDates: string;
  requirements: string;
}

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    institutionName: "",
    contactPerson: "",
    designation: "",
    phoneNumber: "",
    email: "",
    groupSize: "",
    travelDates: "",
    requirements: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add submission logic here
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
              <div className="input__field input__field--full">
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
                <label htmlFor="contactPerson">Contact Person</label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="Name"
                  value={formData.contactPerson}
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

              {/* Group Size */}
              <NumberInput
                label="Group Size (Approx)"
                id="groupSize"
                name="groupSize"
                placeholder="e.g. 45"
                value={formData.groupSize}
                onChange={handleChange}
              />

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
                />
              </div>

              {/* Requirements - Full Width */}
              <div className="input__field input__field--full">
                <label htmlFor="requirements">
                  Preferred Destination / Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  placeholder="Tell us where you want to go or what kind of experience you are looking for..."
                  value={formData.requirements}
                  onChange={handleChange}
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
