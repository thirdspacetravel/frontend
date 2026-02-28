import React, { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";

interface AvatarUploadProps {
  imageUrl?: string;
  onUploadSuccess?: (fileName: string) => void;
  forUsers?: boolean;
}

const AvatarUpload = ({
  imageUrl = "https://placehold.co/120x120",
  onUploadSuccess = () => {},
  forUsers = false,
}: AvatarUploadProps) => {
  const [image, setImage] = useState<string>(imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  const handleIconClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 2. Prepare for upload
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${forUsers ? "users" : "admin"}/upload`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      if (onUploadSuccess && data.filename) {
        onUploadSuccess(data.filename);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      setImage(imageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`avatar-uploader ${isUploading ? "uploading" : ""}`}>
      <div className="avatar-uploader__wrapper">
        <img
          className="avatar-uploader__img"
          src={image}
          alt="Profile preview"
          style={{ opacity: isUploading ? 0.5 : 1 }}
        />
        {isUploading && (
          <div className="overlay">
            <Spinner size={20} strokeWidth={2} />
          </div>
        )}
        <button
          className="avatar-uploader__btn"
          onClick={handleIconClick}
          aria-label="Upload profile photo"
          disabled={isUploading}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="avatar-uploader__icon"
          >
            <path
              d="M9.33 2.66C9.82 2.66 10.27 2.93 10.5 3.36L10.82 3.96C11.06 4.39 11.51 4.66 12 4.66H13.33C14.06 4.66 14.66 5.26 14.66 6V12C14.66 12.73 14.06 13.33 13.33 13.33H2.66C1.93 13.33 1.33 12.73 1.33 12V6C1.33 5.26 1.93 4.66 2.66 4.66H3.99C4.48 4.66 4.93 4.39 5.17 3.96L5.49 3.36C5.72 2.93 6.17 2.66 6.66 2.66H9.33Z"
              stroke="white"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 8.66C6 9.77 6.89 10.66 8 10.66C9.10 10.66 10 9.77 10 8.66C10 7.56 9.10 6.66 8 6.66C6.89 6.66 6 7.56 6 8.66Z"
              stroke="white"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />
    </div>
  );
};

export default AvatarUpload;
