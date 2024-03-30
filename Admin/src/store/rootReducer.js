import layout from "./layout";
import todo from "../pages/app/todo/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";

// import auth from "../pages/auth/common/store";
import auth from "./features/auth/authSlice";
import invoice from "./features/invoice/invoiceSlice";
import account from "./features/account/accountSlice";

const rootReducer = {
  auth,
  invoice,
  account,
  layout,
  todo,
  chat,
  project,

};
export default rootReducer;
