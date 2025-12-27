import express from "express";
import { registerUser,loginUser } from "../Controllers/auth.controllers.js";

const router = express.Router();

// Register route:
router.post("/register", registerUser);

// Login Route : 
router.post("/login", loginUser);

export default router;