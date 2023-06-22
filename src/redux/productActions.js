import axios from "axios";
import {
  addProduct,
  updateProduct,
  setErrorProduct,
  setSuccessProduct,
  setLoading,
  setProduct,
  deleteProduct,
  searchProduct,
} from "./productSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//accion de creacion de producto
export const getProductAction = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/productos`);
      dispatch(setProduct(res.data));
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
    dispatch(searchProduct(value));
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
export const patchProductAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.patch(`${url}/productos`, values, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      /* dispatch(updateProduct(res.data)); */
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
