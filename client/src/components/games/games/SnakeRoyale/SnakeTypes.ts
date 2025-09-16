export interface SnakeCell {
  x: number;
  y: number;
}

export interface SnakeState {
  snake: SnakeCell[];
  direction: "up" | "down" | "left" | "right";
  food: SnakeCell;
  gameOver: boolean;
}
