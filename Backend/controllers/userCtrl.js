const {
  generateAuthToken,
  calculateExpiryDate,
} = require("../config/JwtVerify");
const USER = require("../models/UserModal");
const bcrypt = require("bcrypt");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate authentication token
    const authToken = generateAuthToken(user._id);
    // Calculate token expiry date
    const expiryDate = calculateExpiryDate();

    return res
      .status(200)
      .json({ authToken, expiryDate, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: error.message });
  }
};

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the email is already registered
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new USER({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Find user by ID
    let user = await USER.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update user fields
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and delete
    const deletedUser = await USER.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  Login,
  Signup,
  DeleteUser,
  UpdateUser,
};
