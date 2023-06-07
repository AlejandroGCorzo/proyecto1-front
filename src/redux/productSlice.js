import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, addProduct, setProduct, setError } =
  productSlice.actions;

export default productSlice.reducer;
