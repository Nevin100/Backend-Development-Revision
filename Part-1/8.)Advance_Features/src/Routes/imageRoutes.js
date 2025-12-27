import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import uploadMiddleware from "../Middleware/uploadMiddleware.js";
import {uploadImage} from "../Controllers/Cloudinary.Controllers.js";

const router = express.Router();

// Image Upload Route:
router.post("/upload", authMiddleware, uploadMiddleware.single("image"), uploadImage );

export default router;