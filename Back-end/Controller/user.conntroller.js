import User from "../Model/user.model.js";
import bcrypt from "bcrypt";

// create user
const createUser = async (req, res) => {
  const { name, address, email, password } = req.body;

  // Validate input
  if (!name || !address || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password using bcrypt
  const hashPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    name,
    address,
    email,
    password: hashPassword,
  });

  await newUser.save();

  res.status(201).json({
    message: "User created successfully",
    success: true,
    newUser,
  });
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, address, email, password } = req.body;

  // Find the user by ID
  const existingUser = await User.findById(id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Hash the new password if it is provided
  let hashPassword;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  } else {
    hashPassword = existingUser.password; // Keep the old password if not updating
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      address,
      email,
      password: hashPassword,
    },
    { new: true } 
  );

  await updatedUser.save();

  res.status(200).json({
    message: "User updated successfully",
    success: true,
    updatedUser: existingUser,
  });
};

// get all users
const getAllUsers = async (req,res)=>{
  try {
      const allUsers = await User.find({}).sort({createdAt:-1})
      res.status(201).json({
        message:"All users are fetched",
        success:true,
        allUsers
      })
  } catch (error) {
    res.status(401).json({
      message:"Error while fetching users",
      success:false,
    })
  }
}

export { createUser, updateUser , getAllUsers };
