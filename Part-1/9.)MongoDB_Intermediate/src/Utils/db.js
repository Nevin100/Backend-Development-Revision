import mongoose from "mongoose";

const ConnectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error in DB Connection", error);
        process.exit(1);
    }
} 

export default ConnectDB;