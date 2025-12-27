import multer from "multer";
import path from "path";

// Multer Storage Configuration
// Multer Disk Storage -> Store files on disk
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "src/uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

// File Filter to allow only images
// Check the file type
const checkFileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new Error("Not an image! Please upload images only"))
    }
}

// Multer Upload Middleware
// Export the multer upload middleware
export default multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize : 5 * 1024 * 1024
    },
})