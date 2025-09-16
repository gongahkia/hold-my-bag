import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  // Validate credentials, call userService.authenticate, return JWT
  return res.status(501).json({ error: "Not implemented" });
}

export async function signup(req: Request, res: Response) {
  // Validate registration, hash password, create user
  return res.status(501).json({ error: "Not implemented" });
}
