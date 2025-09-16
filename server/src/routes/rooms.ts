import { Router } from "express";
import { createRoom, joinRoom } from "../controllers/roomController";

const router = Router();

router.post("/create", createRoom);
router.post("/join/:roomCode", joinRoom);

export default router;
