import axios from "axios";
import {
  addProduct,
  updateProduct,
  setErrorProduct,
  setSuccessProduct,
  setLoading,
  setProduct,
  setFeaturedProducts,
  deleteProduct,
  setFilters,
  filterProducts,
  setSearchProducts,
  orderProducts,
  setEmptyFilters,
  setDetail,
} from "./productSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//accion de creacion de producto
export const getProductsAction = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/productos`);
      dispatch(setProduct(res.data));
      dispatch(setFeaturedProducts(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct(error.message));
      }
    }
  };
};

//accion para buscar productos
export const searchProductsAction = (value) => {
  return async function (dispatch) {
    /*  try { */
    dispatch(setLoading(true));
    /* const res = await axios.get(`${url}/productos`); */
    dispatch(setSearchProducts(value));
    dispatch(setLoading(false));
    /* } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct());
      }
    } */
  };
};

export const setFiltersAction = (values) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch(setFilters(values));
    dispatch(setLoading(false));
  };
};
export const clearFiltersAction = (values) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch(setEmptyFilters(values));
    dispatch(setLoading(false));
  };
};
//accion para ordenar productos
export const orderProductsAction = (value) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch(orderProducts(value));
    dispatch(setLoading(false));
  };
};
//accion para filtrar productos
export const filterProductsAction = () => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch(filterProducts());
    dispatch(setLoading(false));
  };
};

//accion de creacion de producto
export const postProductAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/productos`, values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProduct(res.data));
      dispatch(setSuccessProduct("Producto creado con exito."));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct(error.message));
      }
    }
  };
};

//accion de creacion de producto
export const patchProductAction = (values, token, id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.patch(`${url}/productos/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateProduct(res.data));
      dispatch(setSuccessProduct("Producto actualizado con exito."));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct(error.message));
      }
    }
  };
};

//accion para eliminar imagenes de productos
export const deleteImgProductsAction = (value, update = true) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${url}/upload-image`, {
        headers: {
          "Content-Type": "application/json",
          /*      authorization: `Bearer ${token}`, */
        },
        data: value,
      });
      if (update) {
        dispatch(updateProduct(res.data.productById));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct(error.message));
      }
    }
  };
};

//accion eliminar de producto
export const deleteProductAction = (id, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${url}/productos/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteProduct(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorProduct(error.response.data?.message));
      } else {
        dispatch(setErrorProduct(error.message));
      }
    }
  };
};

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${url}/productos/${productId}`);
    const product = response.data;
    dispatch(setDetail(product));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    if (error.response) {
      dispatch(setErrorProduct(error.response.data?.message));
    } else {
      dispatch(setErrorProduct(error.message));
    }
  }
};
