export interface Game {
  id: string;
  type: string;
  status: "waiting" | "in-progress" | "completed";
  roomId: string;
  startTime?: string;
  endTime?: string;
  gameData?: any;
}
