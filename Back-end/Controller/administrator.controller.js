import AdministratorSchema from "../Model/adminitrator.model.js";
import bcrypt from 'bcrypt';


const createAdministrator = async (req, res) => {
  const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the administrator already exists
    const existingAdmin = await AdministratorSchema.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Administrator already exists" });
    }

    // hash the password using bcrypt 
     const hashPassword  = await bcrypt.hash(password, 10);

    // Create new administrator
    const newAdmin = new AdministratorSchema({
        name,
        email,
        password:hashPassword
    });

    // save into database
    await newAdmin.save()

  res.status(201).json({
    message:"Administrator created successfully",
    success: true,
    newAdmin
  })
};

export default createAdministrator;
