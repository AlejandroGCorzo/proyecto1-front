import { createSlice } from "@reduxjs/toolkit";

const getWishlist = JSON.parse(localStorage.getItem("wishlist"));

const initialState = {
  wishedProducts:
    getWishlist.wishedProducts && getWishlist.wishedProducts.length
      ? getWishlist.wishedProducts
      : [],
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
        existingItem.quantity += product.quantity;
      } else {
        state.wishedProducts.push(product);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          wishedProducts: state.wishedProducts,
        })
      );
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.wishedProducts.find(
        (item) => item.id === itemId
      );
      const filteredWishlist = state.wishedProducts.filter(
        (item) => item.id !== itemId
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;

        state.wishedProducts = [...filteredWishlist, itemToUpdate];
        localStorage.setItem(
          "wishlist",
          JSON.stringify({
            wishedProducts: state.wishedProducts,
          })
        );
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload.id;
      let filteredProducts = state.wishedProducts.filter(
        (elem) => elem.id !== productId
      );
      state.wishedProducts = filteredProducts;

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          wishedProducts: state.wishedProducts,
        })
      );
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
