export interface Room {
  id: string;
  code: string;
  hostId: string;
  gameType: string;
  status: "open" | "active" | "closed";
  maxPlayers: number;
  createdAt: Date;
}
