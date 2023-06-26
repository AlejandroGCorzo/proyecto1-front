import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  productsBackUp: null,
  productsSearch: null,
  productsFilter: null,
  loading: false,
  success: "",
  error: "",
  errorSearch: "",
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
      state.productsBackUp = action.payload;
    },
    searchProduct: (state, action) => {
      let filteredProducts = state.products.filter(
        (item) =>
          item.modelo.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.marca.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.tipo.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.genero.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.codigo.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.proveedor.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.disciplina.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (filteredProducts.length) {
        state.productsSearch = filteredProducts;
      } else {
        state.productsSearch = state.products;
        state.errorSearch = "Producto no encontrado";
      }
    },
    filterProducts: (state, action) => {
      let filteredProducts;
      if (typeof action.payload === "string") {
        filteredProducts = state.products.filter(
          (item) =>
            item.modelo.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.marca.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.tipo.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.genero.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.codigo.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.proveedor
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            item.disciplina.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.productsFilter = filteredProducts;
      } else {
        if (action.payload.category?.length) {
          state.productsFilter = action.payload.category
            .map((elem) => state.products.filter((prod) => prod.tipo === elem))
            .flat(Infinity);
        } else {
          state.productsFilter = state.products;
        }
      }
    },
    setSearchProducts: (state, action) => {
      state.productsSearch = state.products;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, action) => {
      let filteredProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );

      state.products = [...filteredProducts, action.payload];
    },
    deleteProduct: (state, action) => {
      let filteredProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = filteredProducts;
      state.productsBackUp = filteredProducts;
    },
    setErrorProduct: (state, action) => {
      state.error = action.payload;
    },
    setErrorSearchProduct: (state, action) => {
      state.errorSearch = action.payload;
    },
    setSuccessProduct: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const {
  setLoading,
  addProduct,
  updateProduct,
  deleteProduct,
  setProduct,
  setSearchProducts,
  searchProduct,
  filterProducts,
  setErrorProduct,
  setErrorSearchProduct,
  setSuccessProduct,
} = productSlice.actions;

export default productSlice.reducer;
