const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  authToken: String, // Authentication token for session management
  authTokenExpiry: Date, // Expiration time for the authentication token
});

const USER = mongoose.model("User", userSchema);

module.exports = USER;
