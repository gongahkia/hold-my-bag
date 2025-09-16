import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import { ENV } from "./config/environment";
import { setupSocket } from "./services/socketService";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

setupSocket(io);

httpServer.listen(ENV.PORT, () => {
  console.log(`API server listening on port ${ENV.PORT}`);
});
