const express = require("express");
const { createAccount, getAccountById, updateAccount, deleteAccount, getAllAccounts } = require("../controllers/accountCtrl");
const { authMiddleware } = require("../middleware/authMiddleWare");

const router = express.Router();
router.post("/",authMiddleware, createAccount);
router.get("/", authMiddleware,getAllAccounts);
router.get("/:id", authMiddleware, getAccountById);
router.delete("/:id",authMiddleware, deleteAccount);
router.put("/:id", authMiddleware,updateAccount);

module.exports = router;
