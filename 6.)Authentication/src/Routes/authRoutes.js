import express from "express";
import { registerUser } from "../Controllers/auth.controllers.js";

const router = express.Router();

// Register route:
router.get("/register", registerUser);

export default router;