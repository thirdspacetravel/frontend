import React, { useState, useRef, type ChangeEvent } from "react";
import Spinner from "../../../components/utils/Spinner";

interface GalleryImage {
  url: string;
  isPending: boolean;
  id: string;
}

interface MediaGalleryUploadProps {
  tripData: {
    images: string[];
  };
  onChange: (urls: string[]) => void;
}

const MediaGalleryUpload: React.FC<MediaGalleryUploadProps> = ({
  tripData,
  onChange,
}) => {
  // We ONLY track images that are currently in the process of uploading
  const [pendingImages, setPendingImages] = useState<GalleryImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- DERIVED STATE ---
  // Combine the "truth" from props with the "temporary" local uploads
  const allImages = [
    ...tripData.images.map((url) => ({
      url,
      isPending: false,
      id: url,
    })),
    ...pendingImages,
  ];

  const uploadFileToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Network response was not ok");
    }

    const data = await response.json();
    return data.filename;
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // 1. Create local previews for the "pending" state
    const newPending: GalleryImage[] = files.map((file) => ({
      url: URL.createObjectURL(file), // Blob URL for immediate preview
      isPending: true,
      id: `${Date.now()}-${Math.random()}`,
    }));

    setPendingImages((prev) => [...prev, ...newPending]);

    // 2. Upload them
    const uploadPromises = files.map(async (file, index) => {
      try {
        const serverFilename = await uploadFileToServer(file);
        return {
          success: true,
          filename: serverFilename,
          tempId: newPending[index].id,
        };
      } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, tempId: newPending[index].id };
      }
    });

    const results = await Promise.all(uploadPromises);

    // 3. Update Parent with successful URLs
    const successfulFilenames = results
      .filter((r) => r.success)
      .map((r) => r.filename as string);

    if (successfulFilenames.length > 0) {
      onChange([...tripData.images, ...successfulFilenames]);
    }

    // 4. Remove these from the local pending state
    const processedIds = results.map((r) => r.tempId);
    setPendingImages((prev) =>
      prev.filter((img) => !processedIds.includes(img.id)),
    );

    e.target.value = "";
  };

  const removeImage = (urlToRemove: string) => {
    onChange(tripData.images.filter((url) => url !== urlToRemove));
  };

  const MAX_DISPLAY = 3;
  const displayImages = allImages.slice(0, MAX_DISPLAY);
  const remainingCount = allImages.length - MAX_DISPLAY;

  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Cover Images</h2>
      </header>

      <div className="content-canvas__body">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <div
          className="media-upload__dropzone"
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="media-upload__prompt">Click to upload</p>
          <span className="media-upload__subtext">or drag and drop</span>
        </div>

        <div className="media-upload__previews">
          {displayImages.map((image, index) => {
            const isLastVisible = index === MAX_DISPLAY - 1;
            const hasMore = remainingCount > 0;
            const imgSrc = image.isPending
              ? image.url
              : `${import.meta.env.VITE_API_URL}/images/${image.url}`;

            return (
              <div key={image.id} className="media-upload__thumbnail">
                <img src={imgSrc} alt="preview" />

                {image.isPending ? (
                  <div className="overlay">
                    <Spinner size={20} strokeWidth={2} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.url);
                    }}
                  >
                    ✕
                  </button>
                )}

                {isLastVisible && hasMore && (
                  <div className="overlay">+{remainingCount}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryUpload;
