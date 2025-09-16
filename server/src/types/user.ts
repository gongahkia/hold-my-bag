export interface User {
  id: string;
  nickname: string;
  createdAt: Date;
  lastActive: Date;
  token?: string;
}
