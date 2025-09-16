import { Router } from "express";
import { getGames, getLeaderboard } from "../controllers/gameController";

const router = Router();

router.get("/", getGames);
router.get("/leaderboard", getLeaderboard);

export default router;
