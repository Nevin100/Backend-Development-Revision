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
        res.status(500).json({message:"Internal Server Issue", error:true})
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
        res.status(500).json({message:"Internal Server Issue", error:true})
        console.log(error);
    }
}
