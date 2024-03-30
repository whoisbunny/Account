// TRANSACTION;

const TRANSACTION = require("../models/TransactionModal");

// Controller to create a new Transaction
const createTransaction = async (req, res) => {
  try {
    var {
      date,
      partyName,
      amount,
      referenceOfInvoices,
      TransactionMethod,
      type,
    } = req.body;

    referenceOfInvoices = JSON.parse(referenceOfInvoices);
    const newTransaction = new TRANSACTION({
      date,
      partyName,
      amount,
      referenceOfInvoices,
      TransactionMethod,
      type,
    });
    await newTransaction.save();
    return res
      .status(201)
      .json({
        message: "Transaction created successfully",
        TRANSACTION: newTransaction,
      });
  } catch (error) {
    console.error("Error creating Transaction:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get all Transactions
const getAllTransactions = async (req, res) => {
  try {
    const Transactions = await TRANSACTION.find()
      .populate("partyName")
      .populate("referenceOfInvoices");
    return res.status(200).json(Transactions);
  } catch (error) {
    console.error("Error getting Transactions:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get a single Transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const TransactionId = req.params.id;
    const Transaction = await TRANSACTION.findById(TransactionId)
      .populate("partyName")
      .populate("referenceOfInvoices");
    if (!Transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json(Transaction);
  } catch (error) {
    console.error("Error getting Transaction by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to update an existing Transaction
const updateTransaction = async (req, res) => {
  try {
    const TransactionId = req.params.id;
    var {
      date,
      partyName,
      amount,
      referenceOfInvoices,
      TransactionMethod,
      type,
    } = req.body;

    referenceOfInvoices = JSON.parse(referenceOfInvoices);
    const updatedTransaction = await TRANSACTION.findByIdAndUpdate(
      TransactionId,
      { date, partyName, amount, referenceOfInvoices, TransactionMethod, type },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json({
      message: "Transaction updated successfully",
      Transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating Transaction:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to delete a Transaction
const deleteTransaction = async (req, res) => {
  try {
    const TransactionId = req.params.id;
    const deletedTransaction = await TRANSACTION.findByIdAndDelete(TransactionId);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json({
      message: "Transaction deleted successfully",
      Transaction: deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting Transaction:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
