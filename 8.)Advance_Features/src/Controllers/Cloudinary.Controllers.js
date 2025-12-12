import Image from "../Models/Image.models.js";
import {uploadToCloudinary} from "../Utils/cloudinary.helper.js";

export const uploadImage = async (req,res) =>{
    try {
        if(!req.file){
            return res.status(400).json({message:"File not found", error:true});
        }

        const {url, public_id} = await uploadToCloudinary(req.file.path);

        const newImage = new Image({
            url,
            public_id,
            UploadedBy: req.user._id
        });

        await newImage.save();

        res.status(201).json({message:"Image Uploaded Successfully", image:newImage, error:false});
    } catch (error) {
        res.status(500).json({message:"Internal Server Issue", error:true});
        console.log("Error in uploadImage:", error);
    }
}
