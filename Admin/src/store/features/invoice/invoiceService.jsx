import API from "../../../configs/API";

const getInvoices = async () => {
  const res = await API.get(`invoice`);
  return res.data;
};
const getInvoice = async (data) => {
  const res = await API.get(`invoice/${data}`);
  return res.data;
};
const addinvoice = async (data) => {
  const res = await API.post(`invoice`, data);
  return res.data;
};
const deleteInvoice = async (data) => {
  const res = await API.delete(`invoice/${data}`);
  return res.data;
};
const updateInvoice = async (data) => {
  const res = await API.put(`invoice/${data.id}`, data.formData); 
  return res.data;
};

const invoiceService = {
  getInvoices,
addinvoice,  deleteInvoice,
  updateInvoice,
  getInvoice,
};

export default invoiceService;
