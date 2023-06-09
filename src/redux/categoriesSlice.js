import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subcategorias: [],
  loading: false,
  success: "",
  error: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subcategorias = action.payload;
    },
    addCategory: (state, action) => {
      if (state.categories.length) {
        state.categories = [...state.categories, action.payload];
      } else {
        state.categories = [action.payload];
      }
    },
    addSubCategory: (state, action) => {
      if (state.subcategorias.length) {
        state.subcategorias = [...state.subcategorias, action.payload];
      } else {
        state.subcategorias = [action.payload];
      }
    },
    setErrorCategory: (state, action) => {
      state.error = action.payload;
    },
    setSuccessCategory: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const {
  setLoading,
  addCategory,
  addSubCategory,
  setCategory,
  setSubCategory,
  setErrorCategory,
  setSuccessCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
