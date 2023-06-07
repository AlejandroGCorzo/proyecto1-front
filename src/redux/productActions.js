import axios from "axios";
import { addProduct, setError, setLoading, setProduct } from "./productSlice";
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
      dispatch(setError(error.message));
    }
  };
};
//accion de creacion de producto
export const postProductAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/productos`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProduct(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
