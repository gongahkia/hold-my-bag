import React, { useState } from "react";
import { TriviaState, TriviaQuestion } from "./TriviaTypes";
import QuestionCard from "./QuestionCard";

// Replace with your own questions or fetch from server/API
const defaultQuestions: TriviaQuestion[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    id: "2",
    question: "Which is NOT a programming language?",
    choices: ["Python", "JavaScript", "Netflix", "Go"],
    answer: "Netflix"
  },
  {
    id: "3",
    question: "How many colors are in the rainbow?",
    choices: ["6", "7", "8", "9"],
    answer: "7"
  }
];

const TriviaGame: React.FC = () => {
  const [state, setState] = useState<TriviaState>({
    current: 0,
    score: 0,
    questions: defaultQuestions,
    complete: false
  });

  const handleSelect = (choice: string) => {
    if (state.complete) return;
    const currentQ = state.questions[state.current];
    const correct = choice === currentQ.answer;
    setState(s => ({
      ...s,
      score: s.score + (correct ? 1 : 0),
      current: s.current + 1,
      complete: s.current + 1 === s.questions.length
    }));
  };

  const restart = () => setState({
    current: 0,
    score: 0,
    questions: defaultQuestions,
    complete: false
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Trivia Blitz</h3>
      {!state.complete ? (
        <>
          <div>Score: {state.score}</div>
          <QuestionCard question={state.questions[state.current]} onSelect={handleSelect} />
        </>
      ) : (
        <div>
          <h4>Completed!</h4>
          <div>Your Score: {state.score} / {state.questions.length}</div>
          <button onClick={restart} style={{
            margin: "1rem",
            background: "#000", color: "#fff",
            border: "none", padding: "0.5em 1em", borderRadius: "8px"
          }}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
