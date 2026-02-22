import React from "react";
import { PrefixInput, TextInput } from "../../../components/utils/InputUtils";

const CompanyDetailsForm: React.FC = () => {
  return (
    <div className="profile__card">
      <header className="profile__header">
        <div className="profile__info">
          <h2 className="profile__title">Company Details</h2>
          <p className="profile__subtitle">
            Information displayed on invoices and emails.
          </p>
        </div>
      </header>

      <div className="profile__body">
        <TextInput
          label="Company Name"
          id="company-name"
          defaultValue="Third Space Travel"
        />

        <div className="profile__row col-2">
          <TextInput
            label="Support Email"
            id="support-email"
            type="email"
            defaultValue="hello@thirdspace.com"
          />
          <PrefixInput
            label="Support Phone"
            id="support-phone"
            prefix="+91"
            defaultValue="99887 76655"
          />
        </div>

        <TextInput
          label="GST Number"
          id="gst-number"
          defaultValue="04AABCU9603R1ZM"
        />
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
