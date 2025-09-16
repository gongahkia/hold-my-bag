import React from "react";
import { SnakeCell } from "./SnakeTypes";

interface GameBoardProps {
  snake: SnakeCell[];
  food: SnakeCell;
  size?: number;
}

const SIZE = 10;
const cellPx = 28;

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, size = SIZE }) => (
  <div style={{
    display: "grid",
    gridTemplateRows: `repeat(${size}, ${cellPx}px)`,
    gridTemplateColumns: `repeat(${size}, ${cellPx}px)`,
    gap: 2,
    margin: "1em auto",
    border: "2px solid #000",
    maxWidth: cellPx * size + 10,
  }}>
    {[...Array(size)].map((_, y) =>
      [...Array(size)].map((_, x) => {
        const filled = snake.some(c => c.x === x && c.y === y);
        const isFood = food.x === x && food.y === y;
        let bg = "#fff";
        if (filled) bg = "#000";
        else if (isFood) bg = "#888";
        return (
          <div key={`${x}-${y}`} style={{
            width: cellPx,
            height: cellPx,
            background: bg,
            border: "1px solid #ccc",
          }} />
        );
      })
    )}
  </div>
);

export default GameBoard;
