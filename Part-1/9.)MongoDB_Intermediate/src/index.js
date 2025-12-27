import dotenv from dotenv;
dotenv.config();
import express from "express";

const app = express();
app.use(express.json());
this.

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on PORT : ${process.env.PORT}`);
});