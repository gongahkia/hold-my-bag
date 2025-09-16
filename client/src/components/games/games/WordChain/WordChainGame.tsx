import React, { useState } from "react";
import WordInput from "./WordInput";
import { WordChainState } from "./WordChainTypes";

const initialState: WordChainState = {
  words: [],
  currentInput: "",
  playerTurn: 1,
  gameOver: false
};

const WordChainGame: React.FC = () => {
  const [state, setState] = useState<WordChainState>(initialState);

  const handleWordSubmit = (word: string) => {
    if (!/^[a-zA-Z]+$/.test(word)) {
      setState(prev => ({
        ...prev,
        error: "Special symbols and digits are not allowed!",
        gameOver: false
      }));
      return;
    }
    if (state.words.includes(word)) {
      setState(prev => ({
        ...prev,
        error: `Word already used! Player ${prev.playerTurn} loses.`,
        gameOver: true
      }));
      return;
    }
    if (state.words.length > 0) {
      const lastWord = state.words[state.words.length - 1];
      if (word.toLowerCase() !== lastWord[lastWord.length - 1].toLowerCase()) {
        setState(prev => ({
          ...prev,
          error: `Word must start with '${lastWord[lastWord.length - 1]}'.`,
          gameOver: true
        }));
        return;
      }
    }
    setState(prev => ({
      ...prev,
      words: [...prev.words, word],
      playerTurn: prev.playerTurn === 1 ? 2 : 1,
      error: undefined
    }));
  };

  const handleReset = () => setState(initialState);

  return (
    <div style={{ maxWidth: 340, margin: "auto" }}>
      <h3>Word Chain</h3>
      <p>{state.words.length > 0 ? `Last Word: ${state.words[state.words.length - 1]}` : "Start the chain!"}</p>
      <WordInput onSubmit={handleWordSubmit} disabled={state.gameOver} />
      {state.error && (
        <div style={{ color: "#b00", marginTop: "0.75em" }}>
          {state.error}
          <br />
          <button onClick={handleReset}
            style={{ background: "#000", color: "#fff", border: "none", marginTop: "0.5em", padding: "0.3em 1em" }}>
            Reset
          </button>
        </div>
      )}
      <div style={{ marginTop: "1em" }}>
        <strong>Chain:</strong> {state.words.join(" → ")}
      </div>
      <div style={{ marginTop: "1em" }}><strong>Player Turn:</strong> {state.playerTurn}</div>
    </div>
  );
};

export default WordChainGame;
