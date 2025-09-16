import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  body?: string;
  badge?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, body, badge, children }) => (
  <div style={{
    border: "1px solid #000",
    borderRadius: 8,
    padding: "1.2rem",
    margin: "1rem 0",
    background: "#fff",
    maxWidth: 340
  }}>
    <div style={{ fontWeight: 600, fontSize: "1.1em", marginBottom: "0.24em" }}>{title}</div>
    {badge && <span style={{
      background: "#000",
      color: "#fff",
      padding: "0.25em 0.7em",
      borderRadius: "16px",
      fontSize: "0.8em",
      float: "right"
    }}>{badge}</span>}
    {subtitle && <div style={{ fontSize: "0.95em", color: "#333" }}>{subtitle}</div>}
    {body && <div style={{ fontSize: "0.96em", color: "#222", margin: "0.35em 0" }}>{body}</div>}
    {children}
  </div>
);
export default Card;
