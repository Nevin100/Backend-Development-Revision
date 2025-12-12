import express from "express";
import { registerUser,loginUser, logoutUser, ChangePassword } from "../Controllers/auth.controllers.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Register route:
router.post("/register", registerUser);

// Login Route : 
router.post("/login", loginUser);

// LogOut Route :
router.post("/logout", logoutUser);

// Change Password Route :
router.post("/change-password",authMiddleware, ChangePassword);


export default router;