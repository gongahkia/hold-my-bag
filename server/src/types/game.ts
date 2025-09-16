export interface Game {
  id: string;
  type: string;
  status: "waiting" | "in-progress" | "completed";
  roomId: string;
  startTime?: Date;
  endTime?: Date;
  gameData?: any;
}
