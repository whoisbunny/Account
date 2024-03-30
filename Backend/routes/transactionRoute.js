const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleWare");
const { createTransaction, updateTransaction, deleteTransaction, getTransactionById, getAllTransactions } = require("../controllers/transactionCtrl");

const router = express.Router();
router.post("/",authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.delete("/:id", authMiddleware, deleteTransaction);
router.put("/:id", authMiddleware, updateTransaction);

module.exports = router;
