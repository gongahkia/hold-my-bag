import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      background: "#000",
      color: "#fff",
      border: "none",
      padding: "0.5em 1em",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1em",
      ...props.style
    }}
  >
    {children}
  </button>
);

export default Button;
