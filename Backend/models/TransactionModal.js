const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  partyName: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
  amount: Number,
  referenceOfInvoices: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Invoice",
    },
  ],
  TransactionMethod: {
    type: String,
    default: "Online",
    enum: ["Cash", "Online"],
  },
  type: {
    type: String,
    default: "Payment",
    enum: ["Receipt", "Payment"],
  },
});

const TRANSACTION = mongoose.model("Transaction", transactionSchema);

module.exports = TRANSACTION;
