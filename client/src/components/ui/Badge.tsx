import React from "react";

interface BadgeProps {
  text: string;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color = "#000" }) => (
  <span style={{
    background: color,
    color: "#fff",
    padding: "0.3em 0.7em",
    borderRadius: "14px",
    fontSize: "0.85em",
    marginLeft: "0.5em"
  }}>
    {text}
  </span>
);

export default Badge;
