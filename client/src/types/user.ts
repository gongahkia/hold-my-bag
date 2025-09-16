export interface UserProfile {
  userId: string;
  nickname: string;
  avatarUrl?: string;
  gamesPlayed?: number;
  bestScore?: number;
}

export interface UserAuth {
  userId: string;
  token: string;
  nickname: string;
}
