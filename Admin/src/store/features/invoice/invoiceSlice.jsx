import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import invoiceService from "./invoiceService";

export const getInvoices = createAsyncThunk(
  "invoice/get-invoices",
  async (thunkAPI) => {
    try {
      return await invoiceService.getInvoices();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addInvoice = createAsyncThunk(
  "invoice/add-invoice",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await invoiceService.addinvoice(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteInvoice = createAsyncThunk(
  "invoice/delete-invoice",
  async (data, thunkAPI) => {
    try {
      return await invoiceService.deleteInvoice(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editInvoice = createAsyncThunk(
  "invoice/update-invoice",
  async (data, thunkAPI) => {
    try {
      return await invoiceService.updateInvoice(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getInvoice = createAsyncThunk(
  "invoice/get-invoice",
  async (data, thunkAPI) => {
    try {
      return await invoiceService.getInvoice(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    openInvoiceModal: false,
    isLoading: null,
    editItem: {},
    invoice: {},
    editModal: false,
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openInvoiceModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    updateInvoice: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload.invoices;
        state.totalInvoice = action.payload?.results;
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newInvoice = action.payload;
        toast.success(action.payload?.message);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.isLoading = false;

        state.editItem = {};
        toast.success(action.payload.message);
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.editItem = {};
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success(action.payload.message);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoice = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const { toggleAddModal, toggleEditModal, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
