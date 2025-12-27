import dotenv from "dotenv";
import express from "express";
import connectDB from "./Utils/db.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
