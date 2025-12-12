import cloudinary from "./cloudinary.js";

const uploadToCloudinary = async (filePath) =>{
    try{
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            public_id: result.public_id
        }
    }catch(error){
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
}

export {uploadToCloudinary};