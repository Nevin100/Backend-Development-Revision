import dotenv from 'dotenv';
import express from 'express';
import ConnectDB from "./Utils/db.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req,res) =>{
    res.end("Hello, World");
})

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>  {
    console.log(`Server is running on port ${process.env.PORT}`);
    ConnectDB();
})
