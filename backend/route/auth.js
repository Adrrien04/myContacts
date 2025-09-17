import { authController } from "../controller/authController.js";
import { loginController } from "../controller/loginController.js";
import express from "express";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", authController);

export default router;
