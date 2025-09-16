import React, { useState } from "react";
import DrawingCanvas from "./DrawingCanvas";
import { QuickDrawState } from "./QuickDrawTypes";

const initialState: QuickDrawState = {
  drawing: "",
  isDrawing: false,
  round: 1,
  players: [{ id: "1", name: "Player1" }]
};

const QuickDrawGame: React.FC = () => {
  const [gameState, setGameState] = useState<QuickDrawState>(initialState);

  const handleCanvasChange = (dataUrl: string) => {
    setGameState(prev => ({
      ...prev,
      drawing: dataUrl
    }));
  };

  const handleSubmit = () => {
    // Here you would send drawing data over socket
    alert("Drawing submitted!");
    setGameState(prev => ({
      ...prev,
      round: prev.round + 1,
      drawing: ""
    }));
  };

  return (
    <div style={{ maxWidth: 340, margin: "auto" }}>
      <h3>Quick Draw 👩‍🎨</h3>
      <p>Round: {gameState.round}</p>
      <DrawingCanvas
        onChange={handleCanvasChange}
        disabled={gameState.isDrawing}
      />
      <button
        onClick={handleSubmit}
        disabled={!gameState.drawing}
        style={{ margin: "1rem 0", background: "#000", color: "#fff", border: "none", padding: "0.5em 1em", borderRadius: 4 }}
      >
        Submit Drawing
      </button>
    </div>
  );
};

export default QuickDrawGame;
