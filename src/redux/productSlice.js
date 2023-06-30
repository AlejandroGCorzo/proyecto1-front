import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  detail: null,
  featuredProducts: [],
  productsSearch: null,
  productsFilter: null,
  filters: {
    nombre: [],
    category: [],
    color: [],
    marca: [],
    genero: [],
    disciplina: [],
    talle: [],
    precio: [],
  },
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
      state.productsFilter = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    orderProducts: (state, action) => {
      let orderedProducts = state.productsFilter;

      if (action.payload === "asc") {
        orderedProducts = orderedProducts.sort((a, b) => a.precio - b.precio);
      }
      if (action.payload === "desc") {
        orderedProducts = orderedProducts.sort((a, b) => b.precio - a.precio);
      }
      if (action.payload === "A-Z") {
        orderedProducts = orderedProducts.sort((a, b) =>
          a.modelo.localeCompare(b.modelo)
        );
      }
      if (action.payload === "Z-A") {
        orderedProducts = orderedProducts.sort((a, b) =>
          b.modelo.localeCompare(a.modelo)
        );
      }
      if (action.payload === "relevancia") {
        let relevantes = orderedProducts.filter(
          (prod) =>
            prod.destacado === true ||
            prod.descuento > 0 ||
            (prod.talle.length > 0 &&
              prod.talle
                .map((item) => item.cantidad)
                .reduce((elem, acc) => (acc += elem)) === 1)
        );
        let noRelevantes = orderedProducts.filter(
          (prod) =>
            prod.destacado === false &&
            prod.descuento === 0 &&
            prod.talle.length > 0 &&
            prod.talle
              .map((item) => item.cantidad)
              .reduce((elem, acc) => (acc += elem)) > 1
        );

        orderedProducts = [...relevantes, ...noRelevantes];
      }
      if (action.payload === "descuento") {
        let productsWithDiscount = orderedProducts.filter(
          (prod) => prod.descuento > 0
        );
        let productsWithoutDiscount = orderedProducts.filter(
          (prod) => prod.descuento === 0
        );
        orderedProducts = [...productsWithDiscount, ...productsWithoutDiscount];
      }
      if (action.payload === "nuevo") {
        orderedProducts = orderedProducts.sort(
          (a, b) =>
            a.productoDate.split("-")[2].slice(0, 2) -
            b.productoDate.split("-")[2].slice(0, 2)
        );
      }

      state.productsFilter = orderedProducts;
    },
    filterProducts: (state, action) => {
      let filteredProducts = state.products;

      if (state.filters?.nombre?.length) {
        //buscar por categoria
        //setear filteredProducts
        filteredProducts = state.filters.nombre
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
      state.productsSearch = [...filteredProducts, action.payload];
      state.productsFilter = [...filteredProducts, action.payload];
    },
    deleteProduct: (state, action) => {
      let filteredProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = filteredProducts;
      state.productsFilter = filteredProducts;
      state.productsSearch = filteredProducts;
    },
    setEmptyFilters: (state, action) => {
      state.filters = initialState.filters;
      state.productsFilter = state.products;
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
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const {
  setLoading,
  addProduct,
  updateProduct,
  deleteProduct,
  setProduct,
  setDetail,
  setFeaturedProducts,
  setSearchProducts,
  setFilters,
  filterProducts,
  orderProducts,
  setEmptyFilters,
  setErrorProduct,
  setErrorSearchProduct,
  setSuccessProduct,
} = productSlice.actions;

export default productSlice.reducer;
