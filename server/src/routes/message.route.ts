import express from "express";
import {
    sendMessage,
    getMessages,
    sendImage,
    deleteMessage,
} from "../controllers/message.controller";
import { verifyUserAutherization } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.post("/send/:id", verifyUserAutherization, sendMessage);
router.post(
    "/send-image/:id",
    verifyUserAutherization,
    upload.single("image"),
    sendImage
);
router.get("/:id", verifyUserAutherization, getMessages);
router.delete("/delete/:id", verifyUserAutherization, deleteMessage);

export default router;
