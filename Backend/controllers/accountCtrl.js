const ACCOUNT = require("../models/AccountModal");
const INVOICE = require("../models/InvoiceModal");
const TRANSACTION = require("../models/TransactionModal");

// Controller to create a new account
const createAccount = async (req, res) => {
  try {
    const newAccount = new ACCOUNT(req.body);
    await newAccount.save();
    return res
      .status(201)
      .json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const type = req.query.type;
    if (type) {
      var accounts = await ACCOUNT.find({ type: type });
    } else {
      var accounts = await ACCOUNT.find();
    }
    return res.status(200).json(accounts);
  } catch (error) {
    console.error("Error getting accounts:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to get a single account by ID
const getAccountById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await ACCOUNT.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error("Error getting account by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to update an existing account
const updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const updatedAccount = await ACCOUNT.findByIdAndUpdate(
      accountId,
      req.body,
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({
      message: "Account updated successfully",
      account: updatedAccount,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to delete an account
const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const deletedAccount = await ACCOUNT.findByIdAndDelete(accountId);
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({
      message: "Account deleted successfully",
      account: deletedAccount,
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getSummary = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await ACCOUNT.findById(id)
    const transactions = await TRANSACTION.find({ partyName: id }).populate(
      "referenceOfInvoices"
    );
    const invoices = await INVOICE.find({ partyName: id });
    let data = [...transactions, ...invoices];
    data.sort((a, b) => a.date - b.date);

    console.log(data);
    res.status(200).json({
      status: "success",
      account,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  getSummary,
};
