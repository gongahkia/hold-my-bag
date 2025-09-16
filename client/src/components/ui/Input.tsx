import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => (
  <input
    {...props}
    style={{
      padding: "0.4em",
      border: "1px solid #000",
      borderRadius: "3px",
      fontSize: "1em",
      margin: "0.14em 0",
      ...props.style
    }}
  />
);

export default Input;
