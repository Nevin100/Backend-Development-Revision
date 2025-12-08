import mongoose from "mongoose";

const Book = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  

})
