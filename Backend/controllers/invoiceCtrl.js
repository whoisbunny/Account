// controllers/invoiceController.js

const INVOICE = require("../models/InvoiceModal");

// Controller for creating a new invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = await INVOICE.create(req.body);
    res.status(201).json({
      status: "success",

      invoice,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller for getting all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await INVOICE.find().populate("partyName");
    res.status(200).json({
      status: "success",
      results: invoices.length,

      invoices,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Controller for getting a single invoice by ID
const getInvoice = async (req, res) => {
  try {
    const invoice = await INVOICE.findById(req.params.id).populate("partyName");
    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      status: "success",

      invoice,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Controller for updating an invoice
const updateInvoice = async (req, res) => {
  try {
    const invoice = await INVOICE.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }
    res.status(200).json({
      status: "success",

      invoice,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller for deleting an invoice
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await INVOICE.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        status: "fail",
        message: "Invoice not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
module.exports = {
  deleteInvoice,
  updateInvoice,
  getAllInvoices,
  getInvoice,
  createInvoice,
};
