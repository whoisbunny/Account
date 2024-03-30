const jwt = require("jsonwebtoken");
const USER = require("../models/UserModal");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await USER.findById(decoded?.id);

        req.user = user;

        next();
      } else {
        return res
          .status(404)
          .json({ message: "Not authorized Token expired " });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "There is no authorization" });
  }
};
module.exports = { authMiddleware };
