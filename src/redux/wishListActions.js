import {
  addProduct,
  removeProduct,
  setLoading,
  updateQuantity,
} from "./wishListSlice";

export const addProductToWishlist = (product) => {
  return function (dispatch) {
    dispatch(addProduct(product));
  };
};
export const updateWishlistAction = (values) => {
  return function (dispatch) {
    dispatch(updateQuantity(values));
  };
};
export const removeProductFromWishlist = (values) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    dispatch(removeProduct(values));
    setTimeout(() => dispatch(setLoading(false)), 500);
  };
};
export const clearWishlist = () => {
  return function (dispatch) {
    dispatch(clearWishlist());
  };
};
