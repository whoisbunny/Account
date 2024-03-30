import API from "../../../configs/API";

const login = async (userData) => {
  console.log(userData);

  const res = await API.post(`user/login`, userData);

  if (res.data) {
    // localStorage.setItem("ADMIN", JSON.stringify(res.data?.user));
    localStorage.setItem("TOKEN", JSON.stringify(res.data?.authToken));
  }
  return res.data;
};

// const loginotp = async (DATA) => {
//   const res = await axios.post(`${baseUrl}users/check-verification`, DATA);
//   if (res.data) {
//     localStorage.setItem("ADMIN", JSON.stringify(res.data?.unverifiedUser));
//     localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
//   }
//   return res.data;
// };
const reg = async (userData) => {
  console.log(userData);

  const res = await API.post(`user/register`, userData);
  return res.data;
};

const authService = {
  login,
  reg,
  //   forgotPass,
  //   forgotPassVerify,
  //   loginotp,
};

export default authService;
