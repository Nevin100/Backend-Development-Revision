import bcrypt from 'bcryptjs';
import User from '../Models/Users.models.js';

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
        const hashedPassword = await bcrypt.hash(genSalt,password);

        const NewUser = new User({
            userName,
            email,
            password:hashedPassword,
            role: role || "user"
        });

        if (NewUser){
            // const token = genearateToken(NewUser._id);

            await NewUser.save();

            return res.status(201).json({
                message:"User registered Successfully",
                // accessToken : token,
                data: NewUser.select("-password"),
                error: false,
            })
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Issue", error:true})
        console.log(error);
    }
}