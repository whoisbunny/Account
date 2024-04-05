import API from "../../../configs/API";

const getTrans = async () => {
  const res = await API.get(`transaction`);
  return res.data;
};
const getTran = async (data) => {
  const res = await API.get(`transaction/${data}`);
  return res.data;
};
const addTran = async (data) => {
  const res = await API.post(`transaction`, data);
  return res.data;
};
const deleteTran = async (data) => {
  const res = await API.delete(`transaction/${data}`);
  return res.data;
};
const updateTran = async (data) => {
  const res = await API.put(`transaction/${data.id}`, data.formData);
  return res.data;
};

const transactionService = {
  getTrans,
  addTran,
  deleteTran,
  updateTran,
  getTran,
};

export default transactionService;
