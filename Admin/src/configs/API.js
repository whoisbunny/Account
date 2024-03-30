import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("TOKEN")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("TOKEN")
    )} `;
  }
  return req;
});

export default API;
