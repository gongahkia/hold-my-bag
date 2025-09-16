import { Server, Socket } from "socket.io";

export function handleRoomEvents(socket: Socket, io: Server) {
  socket.on("room:join", (roomCode) => {
    socket.join(roomCode);
    // Optionally broadcast to room
  });
  socket.on("room:leave", (roomCode) => {
    socket.leave(roomCode);
    // Optionally broadcast leave event
  });
  socket.on("room:create", (gameType) => {
    // Handle room creation
  });
}
