import React from "react";

const LoadingSpinner: React.FC<{size?: number}> = ({ size = 40 }) => (
  <div style={{
    display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem"
  }}>
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#000"
        strokeWidth="5"
        fill="none"
        strokeDasharray="94"
        strokeDashoffset="75"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default LoadingSpinner;
