import { Server, Socket } from "socket.io";

export function setupSocket(server: Server) {
  server.on("connection", (socket: Socket) => {
    // Attach main socket handler
    require("../socket/socketHandler")(socket, server);
  });
}
