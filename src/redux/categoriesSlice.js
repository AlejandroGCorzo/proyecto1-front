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
    addCategory: (state, action) => {
      if (state.categories.length) {
        state.categories = [...state.categories, action.payload];
      } else {
        state.categories = [action.payload];
      }
    },
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    updateCategory: (state, action) => {
      let filteredCategories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );
      state.categories = [...filteredCategories, action.payload];
    },
    deleteCategory: (state, action) => {
      let filteredCategories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );
      state.categories = filteredCategories;
    },
    addSubCategory: (state, action) => {
      if (state.subcategorias.length) {
        state.subcategorias = [...state.subcategorias, action.payload];
      } else {
        state.subcategorias = [action.payload];
      }
    },
    setSubCategory: (state, action) => {
      state.subcategorias = action.payload;
    },
    updateSubCategory: (state, action) => {
      if (state.subcategorias.length) {
        state.subcategorias = [...state.subcategorias, action.payload];
      } else {
        state.subcategorias = [action.payload];
      }
    },
    deleteSubCategory: (state, action) => {
      let filteredSubcategorias = state.subcategorias.filter(
        (item) => item._id !== action.payload._id
      );
      state.subcategorias = filteredSubcategorias;
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
  setCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  setSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setErrorCategory,
  setSuccessCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
