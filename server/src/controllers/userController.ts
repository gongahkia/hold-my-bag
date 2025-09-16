import { Request, Response } from "express";

export async function getProfile(req: Request, res: Response) {
  // Return user profile info
  return res.status(501).json({ error: "Not implemented" });
}

export async function updateProfile(req: Request, res: Response) {
  // Update user profile details
  return res.status(501).json({ error: "Not implemented" });
}
