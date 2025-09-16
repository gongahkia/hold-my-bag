import React from "react";

interface TapButtonProps {
  onTap: () => void;
  disabled?: boolean;
}

const TapButton: React.FC<TapButtonProps> = ({ onTap, disabled }) => (
  <button
    onClick={onTap}
    disabled={disabled}
    style={{
      padding: "1.2em 2.2em",
      fontSize: "1.5rem",
      background: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      margin: "1rem 0"
    }}
  >
    TAP!
  </button>
);

export default TapButton;
