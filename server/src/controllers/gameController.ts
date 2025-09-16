import { Request, Response } from "express";

export async function getGames(req: Request, res: Response) {
  // Return list of game types and info
  return res.json({ games: ["QuickDraw", "WordChain", "TapBattle", "TriviaBlitz", "ColorMatch", "SnakeRoyale"] });
}

export async function getLeaderboard(req: Request, res: Response) {
  // Query DB for leaderboard entries and return
  return res.status(501).json({ error: "Not implemented" });
}
