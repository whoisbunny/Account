import layout from "./layout";
import todo from "../pages/app/todo/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";

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
  todo,
  chat,
  project,
};
export default rootReducer;
