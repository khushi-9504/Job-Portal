import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  forgotPassword,
  generateCaptchaHandler
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import {  upload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(upload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, upload, updateProfile);
router.route("/forgot-password").post(forgotPassword);
router.get("/generate-captcha", generateCaptchaHandler);
// router.post("/forgot-password", forgotPassword);

export default router;
