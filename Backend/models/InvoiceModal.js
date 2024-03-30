const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  partyName: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },

  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  invoiceNumber: String,
  productName: String,
  quantity: Number,
  price: Number,
  grossTotal: Number,
  discount: Number,
  gst: Number,
  total: Number,
  type: {
    type: String,
    default: "Purchase",
    enum: ["Purchase", "Sale"],
  },
});

const INVOICE = mongoose.model("Invoice", invoiceSchema);

module.exports = INVOICE;
