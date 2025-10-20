import mongoose from "mongoose";

// Database Connection Function
const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error in DB connection", error);
  }
};

export default ConnectDB;
