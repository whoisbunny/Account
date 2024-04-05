import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import dayjs from "dayjs";

// const getUserLocalStorage = window.localStorage.getItem("ADMIN")
//   ? JSON.parse(window.localStorage.getItem("ADMIN"))
//   : null;

const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};
const initialDate = () => {
  const item = window.localStorage.getItem("expiryDate");
  return JSON.parse(item);
};
const initialState = {
  //   admin: getUserLocalStorage,
  isAuth: initialIsAuth(),
  // isAuth: false,

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  addModal: false,
  editItem: {},

  expiryDate: initialDate(),

  editModal: false,
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await authService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAdmin = createAsyncThunk(
  "auth/admin-reg",
  async (data, thunkAPI) => {
    try {
      return await authService.reg(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      window.localStorage.removeItem("TOKEN");
      window.localStorage.removeItem("isAuth");
      window.localStorage.removeItem("expiryDate");

      toast.success("User logged out successfully");

      state.isAuth = false;
    },

    openAddModal: (state, action) => {
      state.addModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
      state.editItem = {};
    },

    updateData: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        window.localStorage.setItem(
          "expiryDate",
          JSON.stringify(action.payload.expiryDate)
        );
        state.isSuccess = true;
        toast.success(action.payload.message);

        state.isAuth = true;
        state.expiryDate = action.payload.expiryDate;

        // save isAuth in local storage
        window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));

        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isAuth = false;

        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isError = false;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isAuth = false;

        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { handleLogout, updateData, toggleEditModal, openAddModal } =
  authSlice.actions;
export default authSlice.reducer;
