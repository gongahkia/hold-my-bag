import { Server, Socket } from "socket.io";
import { handleGameEvents } from "./gameEvents";
import { handleRoomEvents } from "./roomEvents";
import { handleUserEvents } from "./userEvents";

module.exports = (socket: Socket, io: Server) => {
  handleGameEvents(socket, io);
  handleRoomEvents(socket, io);
  handleUserEvents(socket, io);

  socket.on("disconnect", () => {
    // Handle disconnect
  });
};
