import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "src/uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const checkFileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new Error("Not an image! Please upload images only"))
    }
}

export default multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize : 5 * 1024 * 1024
    },
})