const express = require('express');
const { Login, Signup, DeleteUser, UpdateUser } = require('../controllers/userCtrl');
const { authMiddleware } = require('../middleware/authMiddleWare');
const router = express.Router();
router.post('/login',Login)
router.post('/register',Signup)
router.delete("/:id", authMiddleware,DeleteUser);
router.put("/:id", authMiddleware,UpdateUser);

module.exports = router