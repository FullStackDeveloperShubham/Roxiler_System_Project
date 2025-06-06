import user from '../Model/user.model.js';
import bcrypt from 'bcrypt';

const createUser = async(req,res) =>{
    const { name, address, email, password } = req.body;

    // Validate input
    if (!name || !address || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new user({
        name,
        address,
        email,
        password: hashPassword
    });

    await newUser.save();

    res.status(201).json({
        message: "User created successfully",
        success: true,
        newUser
    });
}

export default createUser;
