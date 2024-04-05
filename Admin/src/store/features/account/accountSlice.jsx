import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import accountService from "./accountService";

export const getAccounts = createAsyncThunk(
  "account/get-accounts",
  async (thunkAPI) => {
    try {
      return await accountService.getAccounts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAccount = createAsyncThunk(
  "account/add-account",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await accountService.addAccount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "account/delete-account",
  async (data, thunkAPI) => {
    try {
      return await accountService.deleteAccount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editAccount = createAsyncThunk(
  "account/update-account",
  async (data, thunkAPI) => {
    try {
      return await accountService.updateAccount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAccount = createAsyncThunk(
  "account/get-account",
  async (data, thunkAPI) => {
    try {
      return await accountService.getAccount(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAccountSummary = createAsyncThunk(
  "account/get-summary",
  async (data, thunkAPI) => {
    try {
      return await accountService.getAccountSummary(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    openAccountModal: false,
    openSummaryModal: false,
    isLoading: null,
    editItem: {},
    account: {},
    accountSummary:{},
    editModal: false,
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openAccountModal = action.payload;
    },
    
    closeSummaryModal: (state, action) => {
      state.openSummaryModal =  action.payload

    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    updateAccount: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newAccount = action.payload;
        toast.success(action.payload?.message);
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getAccountSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountSummary.fulfilled, (state, action) => {
        state.isLoading = false;
              state.openSummaryModal = !state.openSummaryModal;
              state.accountSummary = action.payload?.data;
              state.account = action.payload?.account
;
      })
      .addCase(getAccountSummary.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {
  toggleAddModal,
  toggleEditModal,
  updateAccount,
  // toggleSummaryModal,
  closeSummaryModal,
} = accountSlice.actions;
export default accountSlice.reducer;
