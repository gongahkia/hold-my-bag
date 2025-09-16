import { GAME_TYPES } from "./constants";

export function isValidGameType(type: string): boolean {
  return (GAME_TYPES as readonly string[]).includes(type);
}

// Get next player turn (cyclic)
export function nextPlayer(current: number, playerCount: number): number {
  return ((current % playerCount) + 1);
}

// Shuffle a flat array (e.g., for questions/cards)
export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
