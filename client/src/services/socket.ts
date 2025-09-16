import { io, Socket } from "socket.io-client";

export function getSocket(serverUrl: string): Socket {
  return io(serverUrl, { transports: ["websocket"] });
}
