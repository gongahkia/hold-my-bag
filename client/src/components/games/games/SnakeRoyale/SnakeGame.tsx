import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./GameBoard";
import { SnakeState, SnakeCell } from "./SnakeTypes";

const SIZE = 10;

function randomCell(): SnakeCell {
  return { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
}

function nextPos(head: SnakeCell, dir: SnakeState["direction"]): SnakeCell {
  switch (dir) {
    case "up": return { x: head.x, y: head.y - 1 };
    case "down": return { x: head.x, y: head.y + 1 };
    case "left": return { x: head.x - 1, y: head.y };
    case "right": return { x: head.x + 1, y: head.y };
  }
}

const SnakeGame: React.FC = () => {
  const [state, setState] = useState<SnakeState>({
    snake: [{ x: 5, y: 5 }],
    direction: "right",
    food: randomCell(),
    gameOver: false
  });

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (state.gameOver) return;
    if (e.key === "ArrowUp" && state.direction !== "down") setState(s => ({ ...s, direction: "up" }));
    else if (e.key === "ArrowDown" && state.direction !== "up") setState(s => ({ ...s, direction: "down" }));
    else if (e.key === "ArrowLeft" && state.direction !== "right") setState(s => ({ ...s, direction: "left" }));
    else if (e.key === "ArrowRight" && state.direction !== "left") setState(s => ({ ...s, direction: "right" }));
  }, [state.direction, state.gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.gameOver) return;
    const timer = setTimeout(() => {
      let newSnake = [...state.snake];
      const newHead = nextPos(state.snake, state.direction);
      // Check collision
      if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE ||
        newSnake.some(c => c.x === newHead.x && c.y === newHead.y)
      ) {
        setState(s => ({ ...s, gameOver: true }));
        return;
      }
      newSnake.unshift(newHead);
      let newFood = state.food;
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        // eat food
        newFood = randomCell();
      } else {
        newSnake.pop();
      }
      setState(s => ({
        ...s,
        snake: newSnake,
        food: newFood
      }));
    }, 160);
    return () => clearTimeout(timer);
  }, [state]);

  const restart = () => setState({
    snake: [{ x: 5, y: 5 }],
    direction: "right",
    food: randomCell(),
    gameOver: false
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Snake Royale</h3>
      {state.gameOver && <div>Game Over! <button onClick={restart} style={{
        background: "#000", color: "#fff", border: "none", borderRadius: "8px", margin: "1rem", padding: "0.5em 1em"
      }}>Restart</button></div>}
      <GameBoard snake={state.snake} food={state.food} />
    </div>
  );
};

export default SnakeGame;
