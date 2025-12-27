import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ConnectDB from "./Utils/db";

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
    ConnectDB();
});