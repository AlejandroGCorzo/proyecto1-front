import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ordersPending: [],
  ordersAccepted: [],
  ordersCanceled: [],
  currentOrder: "",
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrdersPendings: (state, action) => {
      state.ordersPending = action.payload;
    },
    setOrdersAccepted: (state, action) => {
      state.ordersAccepted = action.payload;
    },
    setOrdersCanceled: (state, action) => {
      state.ordersCanceled = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state, action) => {
      state.currentOrder = initialState.currentOrder;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const {
  setLoading,
  setOrdersAccepted,
  setOrdersCanceled,
  setOrdersPendings,
  clearCurrentOrder,
  setCurrentOrder,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer;
