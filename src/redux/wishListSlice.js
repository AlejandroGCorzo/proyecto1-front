import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishedProducts: [],
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addProduct: (state, action) => {
      const product = action.payload;
      let existingItem;

      if (product.id?.length) {
        existingItem = state.wishedProducts.find(
          (item) => item.id === product.id
        );
      }

      if (existingItem) {
        state.wishedProducts = state.wishedProducts;
      } else {
        state.wishedProducts.push(product);
      }
    },

    removeProduct: (state, action) => {
      const productId = action.payload.id;
      let filteredProducts = state.wishedProducts.filter(
        (elem) => elem.id !== productId
      );
      state.wishedProducts = filteredProducts;
    },

    clearWishlist: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setLoading,
  addProduct,
  updateQuantity,
  removeProduct,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
