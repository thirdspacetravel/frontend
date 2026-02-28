import { useState, useMemo, useEffect } from "react";
import { trpc } from "../trpc";
import type { User } from "../../../backend/src/generated/prisma/browser";

const DEFAULT_FORM_DATA = {
  email: "",
  alternateEmail: null,
  status: "PENDING_VERIFICATION",
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
} as const;

export const useProfileData = () => {
  const utils = trpc.useUtils(); // Used to invalidate cache after save

  const { data, isLoading, isError, refetch } = trpc.user.getMe.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  // 1. Define the mutation
  const updateProfile = trpc.user.updateMe.useMutation({
    onSuccess: () => {
      // Refresh the 'getMe' data so the UI stays in sync with the server
      utils.user.getMe.invalidate();
    },
  });

  type FormDataType = Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "passwordHash"
  >;

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

  // 2. The Save Function
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
      throw error; // Re-throw so the UI can handle the error (e.g., toast notification)
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
