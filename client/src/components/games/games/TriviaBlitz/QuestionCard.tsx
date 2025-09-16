import React from "react";
import { TriviaQuestion } from "./TriviaTypes";

interface QuestionCardProps {
  question: TriviaQuestion;
  onSelect: (choice: string) => void;
  disabled?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, disabled }) => (
  <div style={{ border: "1px solid #000", borderRadius: "8px", padding: "1rem", margin: "1rem 0", background: "#fff" }}>
    <div style={{ fontWeight: 700 }}>{question.question}</div>
    <div style={{ margin: "0.7rem 0" }}>
      {question.choices.map(c => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          disabled={disabled}
          style={{
            margin: "0.2em 0.15em",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5em 1.2em",
            cursor: "pointer"
          }}
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionCard;
