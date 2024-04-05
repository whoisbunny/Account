import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import transactionService from "./transactionService";

export const getTransactions = createAsyncThunk(
  "Transaction/get-Transactions",
  async (thunkAPI) => {
    try {
      return await transactionService.getTrans();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addTransaction = createAsyncThunk(
  "Transaction/add-Transaction",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await transactionService.addTran(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  "Transaction/delete-Transaction",
  async (data, thunkAPI) => {
    try {
      return await transactionService.deleteTran(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editTransaction = createAsyncThunk(
  "Transaction/update-Transaction",
  async (data, thunkAPI) => {
    try {
      return await transactionService.updateTran(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTransaction = createAsyncThunk(
  "Transaction/get-Transaction",
  async (data, thunkAPI) => {
    try {
      return await transactionService.getTran(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    openTransactionModal: false,
    isLoading: null,
    editItem: {},
    transaction: {},
    editModal: false,
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openTransactionModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    updateTransaction: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.total = action.payload?.results;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newTransaction = action.payload;
        toast.success(action.payload?.message);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload.Transaction;
        toast.success(action.payload.message);
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { toggleAddModal, toggleEditModal, updateTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
