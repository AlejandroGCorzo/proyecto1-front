import { createSlice } from "@reduxjs/toolkit";

let getStorage = JSON.parse(localStorage.getItem("wishlist"));

const initialState = {
  wishedProducts: getStorage?.wishedProducts?.length
    ? getStorage.wishedProducts
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
        state.wishedProducts = state.wishedProducts;
      } else {
        state.wishedProducts.push(product);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify({ wishedProducts: state.wishedProducts })
      );
    },

    removeProduct: (state, action) => {
      const productId = action.payload.id;
      let filteredProducts = state.wishedProducts.filter(
        (elem) => elem.id !== productId
      );
      state.wishedProducts = filteredProducts;
      localStorage.setItem(
        "wishlist",
        JSON.stringify({ wishedProducts: state.wishedProducts })
      );
    },

    clearWishlist: (state, action) => {
      state.wishedProducts = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { setLoading, addProduct, removeProduct, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
