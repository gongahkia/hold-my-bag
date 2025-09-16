import React, { useState } from "react";

interface WordInputProps {
  onSubmit: (word: string) => void;
  disabled?: boolean;
}

const WordInput: React.FC<WordInputProps> = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        value={input}
        onChange={handleChange}
        type="text"
        minLength={2}
        maxLength={20}
        placeholder="Enter word"
        disabled={disabled}
        style={{ padding: "0.3em", fontSize: "1rem", border: "1px solid #000" }}
      />
      <button type="submit"
        disabled={disabled || !input}
        style={{
          marginLeft: "0.5em", background: "#000", color: "#fff", border: "none", padding: "0.33em 1em"
        }}>Send</button>
    </form>
  );
};

export default WordInput;
