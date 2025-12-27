import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URl);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
    }
}

export default connectDB;