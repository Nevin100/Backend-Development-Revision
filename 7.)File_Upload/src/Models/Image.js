import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    public_id:{
        type: String,
        required: true
    },
    UploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }  
},{
    timestamps: true
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;