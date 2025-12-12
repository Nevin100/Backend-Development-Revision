import bcrypt from 'bcryptjs';
import User from '../Models/Users.models.js';
import generateToken from '../Utils/GenerateToken.js';

// Register : 
export const registerUser = async (req,res) => {
    const {userName, email, password} = req.body;
    try {
        if(!userName){
            return res.status(500).json({message:"UserName is required", error:true});
        }
        if(!email){
            return res.status(500).json({message:"Email is required", error:true});
        }
        if(!password){
            return res.status(500).json({message:"Password is required", error:true});
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,genSalt);

        const NewUser = new User({
            userName,
            email,
            password:hashedPassword,
            role: req.role || "user"
        });

        if (NewUser){
            const token = generateToken(NewUser,res);

            await NewUser.save();

            return res.status(201).json({
                message:"User registered Successfully",
                accessToken : token,
                data: NewUser,
                error: false,
            })
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Issue from register Controller", error:true})
        console.log(error);
    }
}

// Login :
export const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        if(!email){
            return res.status(500).json({message:"Email is required", error:true});
        }
        if(!password){
            return res.status(500).json({message:"Password is required", error:true});
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User not found, please register", error:true});
        }

        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatched){
            return res.status(400).json({message:"Invalid Credentials", error:true});
        }

        const token = generateToken(existingUser,res);

        return res.status(200).json({
            message:"User logged in Successfully",
            accessToken : token,
            data: existingUser,
            error: false,
        }); 
    } catch (error) {
        res.status(500).json({message:"Internal Server Issue from Login Controller", error:true})
        console.log(error);
    }
}

// Logout : 
export const logoutUser = async (req,res) => {
    try{
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message:"User Logged Out Successfully", error:false})
    }catch(error){
        req.status(500).json({message:"Internal Server Issue from Logout Controller", error:true});
        console.log(error);
    }
}

// Change Password : 
export const ChangePassword = async (req,res) => {
    const { newPassword } = req.body;
    const userId = req.user._id;
    try {
        if(!newPassword){
            return res.status(400).json({message:"Password is not provided", error:true});
        }
        if(!userId){
            return res.status(400).json({message: "No UserID Retrieved!! Forbidden !", error:true});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"No such user exists", error:true});
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, genSalt);
        const newDetails = await User.updateOne({_id: userId},{password:hashPassword});

        res.status(200).json({message:"The Password is updated successfully", error:false, data:user});
    } catch (error) {
        res.status(500).json({message:"Internal Server Issue from Change-Password Controller", error:true});
        console.log(error);
    }
}