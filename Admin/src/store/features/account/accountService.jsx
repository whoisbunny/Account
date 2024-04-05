import API from "../../../configs/API";

const getAccounts = async () => {
  const res = await API.get(`account?type=Creditor`);
  return res.data;
};
const getAccount = async (data) => {
  const res = await API.get(`account/${data}`);
  return res.data;
};
const addAccount = async (data) => {
  const res = await API.post(`account`, data);
  return res.data;
};
const deleteAccount = async (data) => {
  const res = await API.delete(`account/${data}`);
  return res.data;
};
const updateAccount = async (data) => {
  const res = await API.put(`account/${data.id}`, data.formData);
  return res.data;
};

const accountService = {
  getAccounts,
  addAccount,
  deleteAccount,
  updateAccount,
  getAccount,
};

export default accountService;
