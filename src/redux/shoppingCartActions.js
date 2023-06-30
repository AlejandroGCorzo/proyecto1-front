const url = import.meta.env.VITE_REACT_APP_API;
import axios from "axios";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
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
    dispatch(removeItem(values));
  };
};
export const clearCartAction = () => {
  return function (dispatch) {
    dispatch(clearCart());
  };
};
