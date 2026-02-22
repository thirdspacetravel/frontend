const MediaGalleryUpload = () => {
  return (
    <div className="content-canvas__card">
      <header className="content-canvas__header">
        <h2 className="content-canvas__title">Cover Image</h2>
      </header>
      <div className="content-canvas__body">
        <div className="media-upload__dropzone">
          <div className="media-upload__icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6.66 4H25.33C26.8 4 28 5.19 28 6.66V25.33C28 26.8 26.8 28 25.33 28H6.66C5.19 28 4 26.8 4 25.33V6.66C4 5.19 5.19 4 6.66 4Z"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33 12C9.33 13.47 10.53 14.66 12 14.66C13.47 14.66 14.66 13.47 14.66 12C14.66 10.53 13.47 9.33 12 9.33C10.53 9.33 9.33 10.53 9.33 12Z"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 20L23.88 15.88C22.84 14.84 21.15 14.84 20.11 15.88L8 28"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="media-upload__prompt">Click to upload</p>
          <span className="media-upload__subtext">or drag and drop</span>
        </div>

        <div className="media-upload__previews">
          <div className="media-upload__thumbnail" />
          <div className="media-upload__thumbnail" />
          <div className="media-upload__thumbnail media-upload__thumbnail--more">
            <span>+2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryUpload;
