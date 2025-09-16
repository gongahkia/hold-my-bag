import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/games";
import roomRoutes from "./routes/rooms";
import userRoutes from "./routes/users";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({ windowMs: 60_000, max: 100 }));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

export default app;
