import { Request, Response } from "express";

export async function createRoom(req: Request, res: Response) {
  // Create new game room
  return res.status(501).json({ error: "Not implemented" });
}

export async function joinRoom(req: Request, res: Response) {
  // Allow client to join room
  return res.status(501).json({ error: "Not implemented" });
}
