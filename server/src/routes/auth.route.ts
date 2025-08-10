import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    uploadProfile,
} from "../controllers/auth.controller";
import { verifyUserAutherization } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/delete/:id", verifyUserAutherization, deleteUser);
router.post(
    "/upload-profile/:id",
    verifyUserAutherization,
    upload.single("profilePic"),
    uploadProfile
);

export default router;
