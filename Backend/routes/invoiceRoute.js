const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleWare");

const {
  createInvoice,
  getAllInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice,
} = require("../controllers/invoiceCtrl");

const router = express.Router();
router.post("/", authMiddleware, createInvoice);
router.get("/", authMiddleware, getAllInvoices);
router.get("/:id", authMiddleware, getInvoice);
router.delete("/:id", authMiddleware, deleteInvoice);
router.put("/:id", authMiddleware, updateInvoice);

module.exports = router;
