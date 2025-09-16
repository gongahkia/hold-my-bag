export interface ApiResponse<T> {
  status: "ok" | "error";
  data?: T;
  error?: string;
}

export interface LeaderboardEntry {
  userId: string;
  nickname: string;
  score: number;
}

export interface JoinRoomRequest {
  roomCode: string;
}

export interface JoinRoomResponse {
  status: "ok" | "error";
  roomCode?: string;
  message?: string;
}
