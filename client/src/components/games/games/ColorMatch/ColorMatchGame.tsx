import React, { useState } from "react";
import { ColorMatchState } from "./ColorMatchTypes";
import ColorGrid from "./ColorGrid";

// Generates a simple NxN grid of random colors for matching
function generateGrid(n: number): string[][] {
  const colors = ["#000", "#888", "#fff", "#ccc", "#222"];
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => colors[Math.floor(Math.random() * colors.length)])
  );
}

function generateMatched(n: number): boolean[][] {
  return Array.from({ length: n }, () => Array(n).fill(false));
}

const ColorMatchGame: React.FC = () => {
  const [state, setState] = useState<ColorMatchState>({
    grid: generateGrid(4),
    matched: generateMatched(4),
    level: 1,
    turns: 0,
    gameOver: false
  });

  const handleCellClick = (row: number, col: number) => {
    if (state.matched[row][col] || state.gameOver) return;
    const color = state.grid[row][col];
    // If matches white, mark as matched, else increment turn
    const matched = state.matched.map(arr => [...arr]);
    if (color === "#fff") {
      matched[row][col] = true;
      // if all matched, level up
      const done = matched.flat().every(Boolean);
      setState(s => ({
        ...s,
        matched,
        level: done ? s.level + 1 : s.level,
        gameOver: done
      }));
      if (done) alert("Level Complete!");
    } else {
      setState(s => ({ ...s, turns: s.turns + 1 }));
    }
  };

  const restart = () =>
    setState({
      grid: generateGrid(4),
      matched: generateMatched(4),
      level: 1,
      turns: 0,
      gameOver: false
    });

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Color Match</h3>
      <div>Level: {state.level} | Turns: {state.turns}</div>
      <ColorGrid grid={state.grid} onCellClick={handleCellClick} matched={state.matched} />
      {state.gameOver && <div>Game Over! <button onClick={restart} style={{
        background: "#000", color: "#fff", border: "none", borderRadius: "8px", margin: "1rem", padding: "0.5em 1em"
      }}>Restart</button></div>}
    </div>
  );
};

export default ColorMatchGame;
