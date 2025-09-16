import React from "react";

interface ColorGridProps {
  grid: string[][];
  onCellClick: (row: number, col: number) => void;
  matched: boolean[][];
}

const cellSize = 40;

const ColorGrid: React.FC<ColorGridProps> = ({ grid, onCellClick, matched }) => (
  <div style={{ display: "grid", gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`, gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`, gap: 6, justifyContent: "center", margin: "1.2rem auto" }}>
    {grid.map((row, i) =>
      row.map((color, j) => (
        <div
          key={`${i}-${j}`}
          onClick={() => onCellClick(i, j)}
          style={{
            width: cellSize,
            height: cellSize,
            background: matched[i][j] ? "#fff" : color,
            border: "1px solid #000",
            cursor: "pointer",
            boxSizing: "border-box"
          }}
        />
      ))
    )}
  </div>
);

export default ColorGrid;
