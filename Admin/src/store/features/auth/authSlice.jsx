import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

// const getUserLocalStorage = window.localStorage.getItem("ADMIN")
//   ? JSON.parse(window.localStorage.getItem("ADMIN"))
//   : null;

const initialState = {
  //   admin: getUserLocalStorage,
  isAuth: false,

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  addModal: false,
  editItem: {},
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
      toast.success("User logged out successfully");
      state.isAuth = false;
      setTimeout(() => {
        window.location.replace("/");
      }, 800);
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
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.isAuth = true;
        state.isError = false;
        if (state.isAuth && state.isSuccess) {
          setTimeout(() => {
            window.location.replace("/admin");
          }, 500);
        }
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
