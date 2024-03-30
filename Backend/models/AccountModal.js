const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: String,
  type: {
    type: String,
    default: "General",
    enum: ["Creditor", "Debtor", "Bank", "General","Cash"],
  },
  address: String,
  gst: String,
  total: { type: Number, default: 0 },
});

const ACCOUNT = mongoose.model("Account", accountSchema);

module.exports = ACCOUNT;
