import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setOrders: (state, action) => {
        state.orders = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });
  export const { setLoading, setOrders, setError } = orderSlice.actions;

  export default orderSlice.reducer;
  