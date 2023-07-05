import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishedProducts: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      state.wishedProducts = [...state.wishedProducts, product];
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      let filteredProducts = state.wishedProducts.filter(
        (elem) => elem.id !== productId
      );
    },
    clearWishlist: (state) => {
      state.wishedProducts = [];
    },
  },
});

export const { addProduct, removeProduct, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
