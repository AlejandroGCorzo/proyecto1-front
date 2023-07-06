const url = import.meta.env.VITE_REACT_APP_API;
import axios from "axios";

import {
  setLoading,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setCupon,
} from "./shopingCartSlice";

export const addToCartAction = (values) => {
  return function (dispatch) {
    dispatch(addItem(values));
  };
};
export const updateCartAction = (values) => {
  return function (dispatch) {
    dispatch(updateQuantity(values));
  };
};
export const removeFromCartAction = (values) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    dispatch(removeItem(values));
    setTimeout(() => dispatch(setLoading(false)), 500);
  };
};
export const clearCartAction = () => {
  return function (dispatch) {
    dispatch(clearCart());
  };
};

///acciones para validar y agregar cupon
export const validateCupon = (values) => {
  return async function (dispatch) {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/cupon/validar/descuento`, values);

      if (res) {
        addCuponToOrder(values);
      }
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
export const addCuponToOrder = (values) => {
  return async function (dispatch) {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/cupon/aplicar/descuento`, values);
      dispatch(setCupon(values));
      dispatch(setSuccessCupon("Cupón agregado con éxito"));
      setLoading(true);
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
