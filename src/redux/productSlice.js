import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  productsSearch: null,
  productsFilter: null,
  filters: {},
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
      state.productsSearch = action.payload;
    },
    setFilters: (state, action) => {
      if (action.payload.name) {
        state.filters = {
          ...state.filters,
          ...action.payload,
          name: action.payload.name,
        };
      } else {
        state.filters = { ...state.filters, ...action.payload };
      }
    },
    filterProducts: (state, action) => {
      let filteredProducts = state.products;

      if (state.filters?.name?.length) {
        //buscar por categoria
        //setear filteredProducts
        filteredProducts = state.filters.name
          .map((item) =>
            filteredProducts.filter((prod) =>
              prod.modelo.toLowerCase().includes(item.toLowerCase())
            )
          )
          .flat();
      }
      if (state.filters?.category?.length) {
        //buscar por category a product filter
        filteredProducts = state.filters.category
          .map((item) => filteredProducts.filter((prod) => prod.tipo === item))
          .flat();
      }
      if (state.filters?.color?.length) {
        //buscar por color a product filter
        filteredProducts = filteredProducts
          .filter((prod) =>
            prod.colores.some((elem) => state.filters.color.includes(elem))
          )
          .flat();
      }
      if (state.filters?.marca?.length) {
        //buscar por marca a product filter
        filteredProducts = state.filters.marca
          .map((item) => filteredProducts.filter((prod) => prod.marca === item))
          .flat();
      }
      if (state.filters?.talle?.length) {
        //buscar por talle a product filter
        filteredProducts = filteredProducts.filter((prod) =>
          prod.talle.some((elem) => state.filters.talle.includes(elem.talle))
        );
      }
      if (state.filters?.genero?.length) {
        //buscar por genero a product filter
        filteredProducts = state.filters.genero
          .map((item) =>
            filteredProducts.filter((prod) => prod.genero === item)
          )
          .flat();
      }
      if (state.filters?.disciplina?.length) {
        //buscar por disciplina a product filter
        filteredProducts = state.filters.disciplina
          .map((item) =>
            filteredProducts.filter(
              (prod) => prod.disciplina.toLowerCase() === item.toLowerCase()
            )
          )
          .flat();
      }
      if (state.filters?.precio?.length) {
        filteredProducts = filteredProducts.filter(
          (prod) =>
            prod.precio >= state.filters.precio[0] &&
            prod.precio <= state.filters.precio[1]
        );
      }

      state.productsFilter = filteredProducts;
    },
    setSearchProducts: (state, action) => {
      if (action.payload?.length) {
        state.productsSearch = state.products.filter(
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
        if (!state.productsSearch.length) {
          state.productsSearch = state.products;
          state.errorSearch = "Producto no encontrado";
        }
      } else {
        state.productsSearch = state.products;
      }
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
  setFilters,
  filterProducts,
  setErrorProduct,
  setErrorSearchProduct,
  setSuccessProduct,
} = productSlice.actions;

export default productSlice.reducer;
