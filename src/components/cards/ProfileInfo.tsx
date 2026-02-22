import React, { useState } from "react";
import AvatarUpload from "../utils/AvatarUpload";
import Button from "../utils/Button";
import { TextInput } from "../utils/InputUtils";
const FormField = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`form-field ${className}`}>
    <label className="form-field__label">{label}</label>
    <div className="form-field__control">{children}</div>
  </div>
);
const ProfileInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "Ananya Sharma",
    dob: { month: "08", day: "14", year: "1996" },
    gender: "Female",
    nationality: "Indian",
    maritalStatus: "Single",
    anniversary: { month: "mm", day: "dd", year: "yyyy" },
    primaryPhone: "+91 98765 43210",
    secondaryPhone: "",
    email: "ananya.sharma@example.com",
    altEmail: "",
    contactMethod: "WhatsApp",
    street: "",
    city: "Chandigarh",
    state: "Chandigarh",
    zip: "160017",
    country: "India",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving Changes:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-info-container">
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Personal Information</h1>
        </div>
        <AvatarUpload />
        <TextInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <div className="grid-3-col">
          <FormField label="Date of Birth">
            <div className="date-input-group">
              <input placeholder="MM" value={formData.dob.month} />
              <span>/</span>
              <input placeholder="DD" value={formData.dob.day} />
              <span>/</span>
              <input placeholder="YYYY" value={formData.dob.year} />
            </div>
          </FormField>
          <FormField label="Gender">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </FormField>
          <FormField label="Nationality">
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            >
              <option>Indian</option>
              <option>American</option>
              <option>British</option>
            </select>
          </FormField>
        </div>

        <div className="grid-2-col">
          <FormField label="Marital Status">
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
            >
              <option>Single</option>
              <option>Married</option>
            </select>
          </FormField>
          <FormField label="Anniversary Date (Optional)">
            <div className="date-input-group">
              <input placeholder="mm" />
              <span>/</span>
              <input placeholder="dd" />
              <span>/</span>
              <input placeholder="yyyy" />
            </div>
          </FormField>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Contact Information</h1>
        </div>
        <div className="grid-2-col">
          <FormField label="Primary Phone">
            <input
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label="Secondary Phone">
            <input
              name="secondaryPhone"
              placeholder="+91"
              onChange={handleInputChange}
            />
          </FormField>
        </div>
        <div className="grid-2-col">
          <FormField label="Email Address">
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label="Alternate Email">
            <input
              name="altEmail"
              placeholder="name@work.com"
              onChange={handleInputChange}
            />
          </FormField>
        </div>
        <FormField label="Preferred Contact Method">
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleInputChange}
          >
            <option>WhatsApp</option>
            <option>Email</option>
            <option>Phone</option>
          </select>
        </FormField>
      </div>
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Address</h1>
        </div>
        <FormField label="Street Address">
          <input
            name="street"
            placeholder="House No, Building, Street Area"
            onChange={handleInputChange}
          />
        </FormField>
        <div className="grid-3-col">
          <FormField label="City">
            <input name="city" value={formData.city} />
          </FormField>
          <FormField label="State">
            <input name="state" value={formData.state} />
          </FormField>
          <FormField label="ZIP Code">
            <input name="zip" value={formData.zip} />
          </FormField>
        </div>
        <FormField label="Country">
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option>India</option>
            <option>USA</option>
          </select>
        </FormField>
      </div>
      <div className="form-actions">
        <Button>Cancel</Button>
        <Button solid onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
