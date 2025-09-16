export interface GameState {
  currentRoom: string | null;
  currentGame: string | null;
  playerScore: number;
  leaderboard: Array<{ userId: string; nickname: string; score: number }>;
}
