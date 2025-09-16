export interface ServerToClientEvents {
  "room:join": (roomCode: string) => void;
  "room:leave": () => void;
  "game:start": () => void;
  "game:end": () => void;
  "game:update": (gameState: any) => void;
  "player:move": (moveData: any) => void;
  "player:score": (score: number) => void;
  "chat:message": (message: string) => void;
  "error:handle": (error: string) => void;
  "connection:status": (status: string) => void;
}

export interface ClientToServerEvents {
  "room:join": (roomCode: string) => void;
  "room:leave": () => void;
  "room:create": (gameType: string) => void;
  "game:start": () => void;
  "game:end": () => void;
  "game:update": (gameState: any) => void;
  "player:move": (moveData: any) => void;
  "player:score": (score: number) => void;
  "chat:message": (message: string) => void;
}

export interface SocketData {
  userId: string;
  nickname: string;
  roomCode?: string;
}
