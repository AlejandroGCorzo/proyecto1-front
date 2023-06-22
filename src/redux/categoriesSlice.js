import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subcategorias: [],
  loading: false,
  success: "",
  error: "",
  errorSearch: "",
  successSub: "",
  errorSub: "",
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
    addSubToCategory: (state, action) => {
      let filteredCategories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );
      let categoryToUpdate = state.categories.find(
        (cat) => cat._id === action.payload._id
      );
      let filteredSubcategories = [];
      if (action.payload.subcategorias.length) {
        for (let i = 0; i < action.payload.subcategorias.length; i++) {
          filteredSubcategories.push(
            state.subcategorias.find(
              (elem) => elem._id === action.payload.subcategorias[i]
            )
          );
        }
      }
      state.categories = [
        ...filteredCategories,
        { ...categoryToUpdate, subcategorias: filteredSubcategories },
      ];
    },
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    searchCategory: (state, action) => {
      let filteredCategories = state.categories.filter((item) =>
        item.nombre.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (filteredCategories.length) {
        state.categories = filteredCategories;
      } else {
        state.categories = state.categories;
        state.errorSearch = "Categoría no encontrada.";
      }
    },
    updateCategory: (state, action) => {
      let filteredCategories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );

      state.categories = [...filteredCategories, action.payload];
    },
    deleteSubFromCategories: (state, action) => {
      let filteredCategories = state.categories.filter(
        (item) => item._id !== action.payload._id
      );
      let categoryToUpdate = state.categories.find(
        (cat) => cat._id === action.payload._id
      );
      let filteredSubcategories = [];
      if (action.payload.subcategorias.length) {
        for (let i = 0; i < action.payload.subcategorias.length; i++) {
          filteredSubcategories.push(
            state.subcategorias.find(
              (elem) => elem._id === action.payload.subcategorias[i]
            )
          );
        }
      }
      state.categories = [
        ...filteredCategories,
        { ...categoryToUpdate, subcategorias: filteredSubcategories },
      ];
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

    deleteSubCategory: (state, action) => {
      let filteredSubcategorias = state.subcategorias.filter(
        (item) => item._id !== action.payload._id
      );
      state.subcategorias = filteredSubcategorias;
    },
    setErrorSearchCategory: (state, action) => {
      state.errorSearch = action.payload;
    },
    setErrorCategory: (state, action) => {
      state.error = action.payload;
    },
    setSuccessCategory: (state, action) => {
      state.success = action.payload;
    },
    setErrorSubCategory: (state, action) => {
      state.errorSub = action.payload;
    },
    setSuccessSubCategory: (state, action) => {
      state.successSub = action.payload;
    },
  },
});

export const {
  setLoading,
  addCategory,
  addSubToCategory,
  setCategory,
  searchCategory,
  updateCategory,
  deleteSubFromCategories,
  deleteCategory,
  addSubCategory,
  setSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setErrorCategory,
  setErrorSearchCategory,
  setSuccessCategory,
  setErrorSubCategory,
  setSuccessSubCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
