import layout from "./layout";

// import auth from "../pages/auth/common/store";
import auth from "./features/auth/authSlice";
import invoice from "./features/invoice/invoiceSlice";
import account from "./features/account/accountSlice";
import transaction from "./features/transaction/transactionSlice";

const rootReducer = {
  auth,
  invoice,

  account,
  transaction,
  layout,
};
export default rootReducer;
