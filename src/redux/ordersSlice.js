import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ordersPending: [],
  ordersAccepted: [],
  ordersCanceled: [],
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
  setError,
} = orderSlice.actions;

export default orderSlice.reducer;
