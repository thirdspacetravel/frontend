import React from "react";
import AvatarUpload from "../utils/AvatarUpload";
import { CustomDropdown, PrefixInput, TextInput } from "../utils/InputUtils";
import { useProfileData } from "../../hooks/useProfileData";
import {
  Gender,
  MaritalStatus,
  ContactMethod as PreferedContactMethod,
} from "../../../../backend/src/generated/prisma/browser";
import InteractiveButton from "../utils/InteractiveButton";
const DropDownWrapper = ({
  label,
  children,
  wrapperClass = "",
  id = "",
}: {
  label: string;
  children: React.ReactNode;
  wrapperClass?: string;
  id?: string;
}) => (
  <div className={`input__field ${wrapperClass ? wrapperClass : ""}`}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);
const validateAltEmail = (
  email: string,
  primaryEmail: string,
): { isValid: boolean; error: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  if (email.toLowerCase() === primaryEmail.toLowerCase()) {
    return {
      isValid: false,
      error: "Alternative email cannot be the same as your primary email.",
    };
  }

  return { isValid: true, error: "" };
};
const ProfileInfo: React.FC = () => {
  const {
    formData,
    handleChange,
    isLoading,
    isError,
    save: saveData,
  } = useProfileData();

  if (isLoading) {
    return (
      <div className="profile-info-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="profile-info-container">
        <p>Error loading profile information.</p>
      </div>
    );
  }
  const handleInputChange = <K extends keyof typeof formData>(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "date") {
      handleChange(
        name as keyof typeof formData,
        value ? new Date(value) : null,
      );
      return;
    }
    if (name === "phoneNumber" || name === "altPhoneNumber") {
      const numericValue = value.replace(/[^0-9]/g, "");
      handleChange(
        name as keyof typeof formData,
        numericValue as unknown as (typeof formData)[K],
      );
      return;
    }
    handleChange(
      name as keyof typeof formData,
      value as unknown as (typeof formData)[K],
    );
  };

  return (
    <div className="profile-info-container">
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Personal Information</h1>
        </div>
        <AvatarUpload
          imageUrl={
            formData.avatarUrl === ""
              ? `/avatars/user.png`
              : `${import.meta.env.VITE_API_URL}/images/${formData.avatarUrl}`
          }
          onUploadSuccess={(filename) => {
            handleChange("avatarUrl", filename);
          }}
          forUsers
        />

        <div className="grid-2-col">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <DropDownWrapper label="Gender">
            <CustomDropdown<Gender>
              options={[
                { value: Gender.MALE, label: "Male" },
                { value: Gender.FEMALE, label: "Female" },
                { value: Gender.OTHER, label: "Other" },
              ]}
              value={formData.gender}
              onSelect={(val) => {
                handleChange("gender", val);
              }}
            />
          </DropDownWrapper>
        </div>

        <div className="grid-3-col">
          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth?.toISOString().split("T")[0] || ""}
            type="date"
            onChange={handleInputChange}
          />
          <DropDownWrapper label="Nationality">
            <CustomDropdown<string>
              options={[
                { value: "Indian", label: "Indian" },
                { value: "American", label: "American" },
                { value: "British", label: "British" },
              ]}
              value={formData.nationality}
              onSelect={(val) => {
                handleChange("nationality", val);
              }}
            />
          </DropDownWrapper>
          <DropDownWrapper label="Marital Status">
            <CustomDropdown<MaritalStatus>
              options={[
                { value: MaritalStatus.SINGLE, label: "Single" },
                { value: MaritalStatus.MARRIED, label: "Married" },
                { value: MaritalStatus.DIVORCED, label: "Divorced" },
              ]}
              value={formData.maritalStatus}
              onSelect={(val) => {
                handleChange("maritalStatus", val);
              }}
            />
          </DropDownWrapper>
        </div>
        <div className="grid-3-col">
          <TextInput
            label="Aniversary Date (optional)"
            name="anniversaryDate"
            value={formData.anniversaryDate?.toISOString().split("T")[0] || ""}
            type="date"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Contact Information</h1>
        </div>
        <div className="grid-2-col">
          <PrefixInput
            label="Phone Number"
            name="phoneNumber"
            prefix="+91"
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
          />
          <PrefixInput
            label="Alternate Phone Number (optional)"
            name="altPhoneNumber"
            prefix="+91"
            value={formData.altPhoneNumber || ""}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
          />
        </div>
        <div className="grid-2-col">
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            readOnly
            onChange={handleInputChange}
          />
          <TextInput
            label="Alternate Email Address (optional)"
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid-2-col">
          <DropDownWrapper label="Preferred Contact Method">
            <CustomDropdown<PreferedContactMethod>
              options={[
                { value: PreferedContactMethod.WHATSAPP, label: "WhatsApp" },
                { value: PreferedContactMethod.EMAIL, label: "Email" },
                { value: PreferedContactMethod.PHONE, label: "Phone" },
              ]}
              value={formData.preferredContact}
              onSelect={(val) => {
                handleChange(
                  "preferredContact",
                  val || PreferedContactMethod.EMAIL,
                );
              }}
            />
          </DropDownWrapper>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-content__header">
          <h1>Address</h1>
        </div>

        <TextInput
          label="Street Address"
          name="streetAddress"
          placeholder="e.g. 123 Main St, Apt 4B"
          value={formData.streetAddress || ""}
          onChange={handleInputChange}
        />

        <div className="grid-3-col">
          <DropDownWrapper label="City">
            <CustomDropdown<string>
              value={formData.city}
              direction="up"
              options={[
                { value: "Mumbai", label: "Mumbai" },
                { value: "Bangalore", label: "Bangalore" },
                { value: "New Delhi", label: "New Delhi" },
                { value: "Chennai", label: "Chennai" },
                { value: "Lucknow", label: "Lucknow" },
              ]}
              onSelect={(val) => {
                handleChange("city", val);
              }}
            />
          </DropDownWrapper>
          <DropDownWrapper label="State">
            <CustomDropdown<string>
              value={formData.state}
              direction="up"
              options={[
                { value: "Maharashtra", label: "Maharashtra" },
                { value: "Karnataka", label: "Karnataka" },
                { value: "Delhi", label: "Delhi" },
                { value: "Tamil Nadu", label: "Tamil Nadu" },
                { value: "Uttar Pradesh", label: "Uttar Pradesh" },
              ]}
              onSelect={(val) => {
                handleChange("state", val);
              }}
            />
          </DropDownWrapper>
          <DropDownWrapper label="Country">
            <CustomDropdown<string>
              value={formData.country}
              direction="up"
              options={[
                { value: "India", label: "India" },
                { value: "USA", label: "USA" },
                { value: "UK", label: "UK" },
                { value: "Canada", label: "Canada" },
                { value: "Australia", label: "Australia" },
                { value: "Germany", label: "Germany" },
                { value: "France", label: "France" },
                { value: "Japan", label: "Japan" },
                { value: "UAE", label: "UAE" },
                { value: "Singapore", label: "Singapore" },
              ]}
              onSelect={(val) => {
                handleChange("country", val);
              }}
            />
          </DropDownWrapper>
        </div>
      </div>
      <div className="form-actions">
        <InteractiveButton
          solid
          onClick={async () => {
            const validation = validateAltEmail(
              formData.alternateEmail || "",
              formData.email,
            );

            if (!validation.isValid) {
              alert(validation.error);
              return;
            }
            await saveData();
          }}
        >
          Save Changes
        </InteractiveButton>
      </div>
    </div>
  );
};

export default ProfileInfo;
