import User from "../Model/user.schema.js";

export const createUser = async (req,res) =>{
    const {name, email} = req.body;
    try {
        if(!name || !email){
            return res.status(400).json({message: "Name and email are required", error: true});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: "User already exists", error: true});
        }

        const newUser = new User({name, email});

        await newUser.save();

        res.status(201).json({message: "User created successfully", data: newUser, error: false});
    } catch (error) {
        res.status(500).json({mssage: "Internal server error", error: true});
        console.log(error);

    }
}