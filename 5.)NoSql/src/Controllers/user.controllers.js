import User from "../Model/user.schema.js";

// Create User:

  // find() : returns an array of documents that match the query
  // findOne() : returns the first single document that matches the query 
  // findById() : returns a single document based on its unique _id field
  // exists() : returns a boolean indicating whether a document matching the query exists

export const createUser = async (req,res) =>{
    const {name, email} = req.body;
    try {
        // Retrieve data from req.body 
        if(!name || !email){
            return res.status(400).json({message: "Name and email are required", error: true});
        }

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: "User already exists", error: true});
        }

        // Create new user
        const newUser = new User({name, email});

        // Save user to database 
        await newUser.save();

        res.status(201).json({message: "User created successfully", data: newUser, error: false});
    } catch (error) {
        res.status(500).json({mssage: "Internal server error", error: true});
        console.log(error);

    }
}

// Get all users:
export const getUsers = async(req,res) => {
    try {
        // Fetch all users from database
        const users = await User.find();

        // Check if users exist
        if(users.length === 0){
            return res.status(400).json({message: "No users found", error: true});
        }

        // Return users data
        res.json({message: "Users retrieved successfully", data: users, error: false});
    } catch (error) {
        res.status(500).json(({message:"Internal Server Issue", error : true}))
        console.log(error);
    }
}

// Get user by ID:
export const getrUser = async(req, res) =>{
    const { id } = req.params;
    try {
        // Check if ID is provided
        if(!id){
            return res.status(400).json({message: "User ID is required", error: true});
        }

        // Find user by ID
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found", error: true});
        }

        // Return user data
        res.json({message: "User retrieved successfully", data: user, error: false});
    } catch (error) {
        res.status(500).json(({message:"Internal Server Issue", error : true}))
        console.log(error);

    }
}

// Update user by ID:
export const UpdateUser = async(req,res) => {
    // Get user ID from req.params and updated data from req.body
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        // Check if ID is provided
        if(!id){
            return res.status(400).json({message: "User ID is required", error: true});
        }

        // Update user details
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found", error: true});
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;

        // Save updated user to database
        await user.save();

        res.json({message: "User updated successfully", data: user, error: false});
    } catch (error) {
        res.status(500).json(({message:"Internal Server Issue", error : true}))
        console.log(error);
    }
}

// Delete user by ID:
export const deleteUser = async(req,res) => {
    const { id } = req.params; 
    try {
        // Check if ID is provided
        if(!id){
            return res.status(400).json({message: "User ID is required", error: true});
        }
        
        // Delete user by ID
        await User.findByIdAndDelete(id);

        res.json({message: "User deleted successfully", error: false});

    } catch (error) {
        res.status(500).json(({message:"Internal Server Issue", error : true}))
        console.log(error);
    }
}