import React from "react";

interface SpinnerProps {
  size?: number; // Diameter of the loader
  strokeWidth?: number; // Thickness of the track
  speed?: number; // Rotation speed in seconds
  color?: string; // Color of the rotating thumb
  trackColor?: string; // Color of the background track
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 50,
  strokeWidth = 4,
  speed = 1,
  color = "var(--color-spinner-dark-thumb)",
  trackColor = "var(--color-spinner-dark-track)",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="spinner-container" style={{ width: size, height: size }}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`0 0 ${size} ${size}`}
        className="spinner-svg"
        style={{ animationDuration: `${speed}s` }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          className="spinner-track"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          strokeLinecap="round"
          className="spinner-thumb"
        />
      </svg>
    </div>
  );
};

export default Spinner;
