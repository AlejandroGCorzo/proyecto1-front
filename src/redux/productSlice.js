import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  loading: false,
  success: "",
  error: "",
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
    setErrorProduct: (state, action) => {
      state.error = action.payload;
    },
    setSuccessProduct: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const {
  setLoading,
  addProduct,
  setProduct,
  setErrorProduct,
  setSuccessProduct,
} = productSlice.actions;

export default productSlice.reducer;
