export interface WordChainState {
  words: string[];
  currentInput: string;
  playerTurn: number;
  error?: string;
  gameOver: boolean;
}

export interface WordChainAction {
  type: "submit" | "reset";
  payload?: string;
}
