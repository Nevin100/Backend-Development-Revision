import User from "../Model/user.schema.js";

  // 1.) Reading Data:
  // req.params : to read data from URL parameters
  // req.query : to read data from query strings
  // req.body : to read data from the request body (usually for POST/PUT requests)

  // 2.) Mongoose Methods:
  // find() : returns an array of documents that match the query
  // findOne() : returns the first single document that matches the query ({name : "John"}) <-- query
  // findById() : returns a single document based on its unique _id field
  // exists() : returns a boolean indicating whether a document matching the query exists
  // save() : saves the current state of a document to the database 
  // findByIdAndUpdate() : finds a document by its _id and updates it with new data
  // findByIdAndDelete() : finds a document by its _id and deletes it from the database
  // deleteOne() : deletes the first document that matches the query
  // deleteMany() : deletes all documents that match the query
  // updateOne() : updates the first document that matches the query with new data
  // updateMany() : updates all documents that match the query with new data
  // limit() : limits the number of documents returned in a query result
  // skip() : skips a specified number of documents in a query result
  // select() : specifies which fields to include or exclude in the query result
  // sort() : sorts the query result based on specified fields 
  
  // 3.) HTTP Status Codes:
  // 200 OK : The request was successful, and the server returned the requested data.
  // 201 Created : The request was successful, and a new resource was created.
  // 400 Bad Request : The server could not understand the request due to invalid syntax or missing data.
  // 404 Not Found : The requested resource could not be found on the server.
  // 409 Conflict : The request could not be completed due to a conflict with the current state of the resource (e.g., duplicate entry).
  // 500 Internal Server Error : The server encountered an unexpected condition that prevented it from fulfilling the request.
  // 403 Forbidden : The client does not have access rights to the content.

// Create a new user:
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
        const users = await User.find().select("-_id"); // Exclude _id field

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