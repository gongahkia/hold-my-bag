import { Server, Socket } from "socket.io";

export function handleUserEvents(socket: Socket, io: Server) {
  socket.on("player:move", (moveData) => {
    // Handle player movement, broadcast if needed
  });
  socket.on("player:score", (score) => {
    // Update score, broadcast leaderboard
  });
  socket.on("chat:message", (message) => {
    // Broadcast chat messages
  });
}
