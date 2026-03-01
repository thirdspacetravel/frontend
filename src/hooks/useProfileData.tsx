import { useState, useMemo, useEffect } from "react";
import { trpc } from "../trpc";
import type { User } from "../../../backend/src/generated/prisma/browser";
type FormDataType = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "passwordHash"
>;

const DEFAULT_FORM_DATA: FormDataType = {
  email: "",
  alternateEmail: null,
  status: "PENDING_VERIFICATION",
  upiId: null,
  fullName: "",
  dateOfBirth: null,
  gender: null,
  nationality: null,
  maritalStatus: null,
  anniversaryDate: null,
  avatarUrl: "",
  phoneNumber: null,
  altPhoneNumber: null,
  preferredContact: "EMAIL",
  streetAddress: null,
  city: null,
  state: null,
  country: null,
  zipCode: null,
  receiveTripUpdates: true,
  receivePromoEmails: false,
};

export const useProfileData = () => {
  const utils = trpc.useUtils();

  const { data, isLoading, isError, refetch } = trpc.user.getMe.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const updateProfile = trpc.user.updateMe.useMutation({
    onSuccess: () => {
      utils.user.getMe.invalidate();
    },
  });

  const formatForInput = (date: string | null) => {
    return date ? new Date(date) : null;
  };

  const computedData = useMemo(() => {
    if (!data) return DEFAULT_FORM_DATA;

    return {
      ...DEFAULT_FORM_DATA,
      ...data,
      dateOfBirth: formatForInput(data.dateOfBirth),
      anniversaryDate: formatForInput(data.anniversaryDate),
    };
  }, [data]);

  const [formData, setFormData] = useState<FormDataType>(computedData);

  useEffect(() => {
    setFormData(computedData);
  }, [computedData]);

  const handleChange = <K extends keyof FormDataType>(
    name: K,
    value: FormDataType[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = async () => {
    try {
      await updateProfile.mutateAsync({
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : null,
        anniversaryDate: formData.anniversaryDate
          ? formData.anniversaryDate.toISOString()
          : null,
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      throw error;
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    save,
    isSaving: updateProfile.isPending,
    saveError: updateProfile.error,
    isLoading,
    isError,
    refetch,
  };
};
