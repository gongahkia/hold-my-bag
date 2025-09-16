import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController";

const router = Router();

router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);

export default router;
