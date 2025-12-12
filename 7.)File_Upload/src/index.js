import dotenv from 'dotenv';
import express from 'express';
import ConnectDB from "./Utils/db.js";
import authRoutes from "./Routes/authRoutes.js";
import imageRoutes from "./Routes/imageRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.get("/", (req,res) =>{
    res.end("Hello, World");
})

app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);

app.listen(process.env.PORT, () =>  {
    console.log(`Server is running on port ${process.env.PORT}`);
    ConnectDB();
})
