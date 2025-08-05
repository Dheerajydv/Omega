import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller";
import { verifyUserAutherization } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/send/:id", verifyUserAutherization, sendMessage);
router.get("/:id", verifyUserAutherization, getMessages);

export default router