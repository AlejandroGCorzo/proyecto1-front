import axios from "axios";
import { addProduct, setError, setLoading, setProduct } from "./productSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//accion de creacion de producto
export const getProductAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/productos`);
      dispatch(setProduct(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
//accion de creacion de producto
export const postProductAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/productos`, values);
      dispatch(addProduct(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${url}/productos/${productId}`);
    const product = response.data;

    dispatch(setProduct(product));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${url}/productos`);
    const products = response.data;
console.log(products)
    dispatch(setProduct(products));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};













