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
      let existingItem;

      if (product.id?.length) {
        existingItem = state.wishedProducts.find(
          (item) => item.id === product.id
        );
      }

      if (existingItem) {
       
        existingItem.quantity += product.quantity;
      } else {
        
        state.wishedProducts.push(product);
      }
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
