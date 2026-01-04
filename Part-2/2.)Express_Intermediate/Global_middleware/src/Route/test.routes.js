import express from "express";
import {asynchandler} from "../Middleware/error.handler.js";

const router = express.Router();

// Sample data
const items = [
    {
        id: 1, 
        name: "Item 1"
    },
    {
        id: 2,
        name: "Item 2"
    },
    {
        id: 3,
        name: "Item 3"
    },
    {
        id: 4,
        name: "Item 4"
    }
];

// Route to get all items
router.get("/items", asynchandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: items
    });
}));

export default router;