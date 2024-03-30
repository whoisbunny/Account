const jwt = require("jsonwebtoken");

// Function to generate authentication token
function generateAuthToken(userId) {
  // Generate a JSON Web Token (JWT) with the user ID as the payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); // Change '1h' to set the expiration time
  return token;
}

// Function to calculate expiry date
function calculateExpiryDate() {
  // Calculate the expiry date based on the current time and the desired expiration duration
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1); // Expiry set to 1 hour from current time
  return expiryDate;
}

module.exports = {
  generateAuthToken,
  calculateExpiryDate,
};
