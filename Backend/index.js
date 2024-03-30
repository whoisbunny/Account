require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const { dbConnect } = require("./config/dbConnect");
const morgan = require("morgan");
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const accountRoute = require("./routes/accountRoute");
const transactionRoute = require("./routes/transactionRoute");
const userRoute = require("./routes/userRoute");
const invoiceRoute = require("./routes/invoiceRoute");

app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/invoice", invoiceRoute);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
